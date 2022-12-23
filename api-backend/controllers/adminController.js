const { db, dbconnection, Answer, Keyword, Question, Questionnaire, Researcher, Session, Token, UniqueAnswer, User, Administrator } = require('../utilities/database');

exports.layout = (req, res) => {}

exports.getHealthCheck = async (req, res) => {
    try {
        await db.authenticate();
        return res.status(200).json({status: 'OK', dbconnection})
    } catch(err) {return res.status(500).json({status: 'failed', dbconnection})}
}

exports.postSurvey = async (req, res) => {
    const title = req.body.questionnaireTitle;
    const about = req.body.about;
    const keywords = req.body.keywords;
    const questions = req.body.questions;

    if(!title) return res.status(400).json({message: 'title is required'});

    const survey = await Questionnaire.create({title, about});

    for(const keyword of keywords) {
        await survey.createKeyword({title: keyword});
    }

    for(const question of questions) {
        const myQuestion = await survey.createQuestion({
            title: question.qtext,
            required: question.required,
            type: question.type
        });
        for(const answer of question.options) {
            await myQuestion.createAnswer({title: answer.opttxt});
        }
    }

    let iQ = 0, iA = 0;
    const myQuestions = await survey.getQuestions();
    for(const question of myQuestions) {
        const myAnswers = await question.getAnswers();
        iA = 0;
        for(const answer of myAnswers) {
            const nextQuestionIndex = Number(questions[iQ].answers[iA].nextqID.substring(1));
            if(nextQuestionIndex > iQ) {
                await answer.setNextQuestion(myQuestions[nextQuestionIndex]);
            }
            iA++;
        }
        iQ++;
    }

    await survey.setFirstQuestion(myQuestions[0]);

    const qCount = await survey.countQuestions();

    return res.status(201).json({
        message: 'survey successfully created', 
        id: survey.id,
        title: survey.title,
        questions: qCount
    })
}

exports.serverReset = async (req, res) => {
    try {
        await Answer.destroy({truncate: true});
        await Keyword.destroy({truncate: true});
        await Question.destroy({truncate: true});
        await Questionnaire.destroy({truncate: true});
        await Researcher.destroy({truncate: true});
        await Session.destroy({truncate: true});
        await UniqueAnswer.destroy({truncate: true});
        await User.destroy({truncate: true});

        return res.status(200).json({status: 'OK'});
    } catch(err) {return res.status(500).json({status: 'failed', reason: err})}
}

exports.surveyReset = async (req, res) => {
    const questionnaireId = req.params.questionnaireID;

    try {
        await Session.destroy({where: {questionnaireId}});
        return res.status(200).json({status: 'OK'});
    } catch(err) {return res.status(500).json({status: 'failed', reason: err})}
}

exports.userMod = async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    const admin = await Administrator.findOne({where: {username}});
    if(admin) {
        admin.password = password;
        await admin.save();

        return res.status(200).json({message: 'password has been successfully changed'});
    } else {
        const user = await User.findOne({where: {username}});
        if(user) await user.destroy();

        const researcher = await Researcher.findOne({where: {username}});
        if(researcher) await researcher.destroy();

        await Administrator.create({username, password});

        return res.status(200).json({message: 'admin created successfully'})
    }
}

exports.partnerMod = async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if(!(username && password)) return res.status(400).json({message: 'parameters missing'})

    const researcher = await Researcher.findOne({where: {username}});
    if(researcher) {
        researcher.password = password;
        await researcher.save();

        return res.status(200).json({message: 'password has been successfully changed'});
    } else {
        const user = await User.findOne({where: {username}});
        if(user) await user.destroy();

        const admin = await admin.findOne({where: {username}});
        if(admin) return res.status(400).json({message: 'user is admin'});

        await Researcher.create({username, password});

        return res.status(200).json({message: 'admin created successfully'})
    }
}

exports.getUser = async (req, res) => {
    const username = req.params.username;
    if(!username) return res.status(400).json({message: 'parameters missing'});

    const user = await User.findOne({where: {username}});
    if(!user) return res.status(400).json({message: 'no user'});

    return res.status(200).json({user: user.toJSON()});
}