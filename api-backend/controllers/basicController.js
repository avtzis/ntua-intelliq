const { User, Administrator, Token, Questionnaire, Keyword, Session, Question, UniqueAnswer } = require("../utilities/database");
//import { Parser } from '@json2csv/plainjs';
const {Parser} = require('@json2csv/plainjs');
const parser = new Parser();

exports.getSurvey = async (req, res) => {
    const format = req.query.format;
    const questionnaireID = req.params.questionnaireID;

    const survey = await Questionnaire.findOne({where: {questionnaireID}});
    if(!survey) return res.status(402).json({message: 'no such survey'});

    const questions = await survey.getQuestions();
    const keywords = await survey.getKeywords();

    let data = {
        questionnaireID,
        questionnaireTitle: survey.title,
        keywords: keywords.map(keyword => keyword.title),
        questions: questions.map(question => {
            return {
                qID: question.qID,
                qText: question.title,
                required: question.required.toUpperCase(),
                type: question.type
            }
        })
    };

    if(format === 'csv') data = parser.parse(data);

    return res.status(200).json(data);
}

exports.getQuestion = async (req, res) => {
    const format = req.query.format;
    const questionnaireID = req.params.questionnaireID;
    const qID = req.params.questionID;

    const survey = await Questionnaire.findOne({where: {questionnaireID}});
    if(!survey) return res.status(402).json({message: 'no such survey'});

    let questions = await survey.getQuestions({where: {qID}});
    if(!questions.length) return res.status(400).json({message: 'no such question'});
    const question = questions[0];

    const answers = await question.getAnswers();
    questions = await survey.getQuestions();

    let data = {
        questionnaireID,
        qID,
        qText: question.title,
        required: question.required.toUpperCase(),
        type: question.type,
        options: answers.map(answer => {
            return {
                optID: answer.optID,
                opttxt: question.answerType === 'options' ? answer.title : '<open string>',
                nextqID: answer.nextqID
            }
        })
    }

    if(format === 'csv') data = parser.parse(data);

    return res.status(200).json(data);
}

exports.postAnswer = async (req, res) => {
    const format = req.query.format;
    const questionnaireID = req.params.questionnaireID;
    const qID = req.params.questionID;
    const ses = req.params.session;
    const optID = req.params.optionID;
    const username = req.user.username;

    const user = await User.findOne({where: {username}});
    if(!user) return res.status(403).json({message: 'only users can answer'})

    const survey = await Questionnaire.findOne({where: {questionnaireID}});
    if(!survey) return res.status(402).json({message: 'no such survey'});

    const questions = await survey.getQuestions({where: {qID}});
    if(!questions.length) return res.status(400).json({message: 'no such question'});
    const question = questions[0];

    let session;
    const sessions = await user.getSessions({where: {ses}});
    if(!sessions.length) session = await user.createSession({ses});
    else session = sessions[0];

    const answers = await question.getAnswers({where: {optID}});
    if(!answers.length) return res.status(400).json({message: 'no such answer'});
    const answer = answers[0];

    await UniqueAnswer.create({
        context: answer.title,
        questionID: question.id,
        sessionId: session.id,
        answerId: answer.id
    });

     return res.sendStatus(201);
}

exports.getSessionAnswers = async (req, res) => {
    const format = req.query.format;
    const questionnaireID = req.params.questionnaireID;
    const ses = req.params.session;

    const survey = await Questionnaire.findOne({where: {questionnaireID}});
    if(!survey) return res.status(402).json({message: 'no such survey'});

    const session = await Session.findOne({where: {ses}});
    if(!session) return res.status(402).json({message: 'no such session'});

    const answers = await session.getUniqueAnswers();

    let data = {
        questionnaireID,
        session: ses,
        answers: answers.map(async answer => {
            const question = await Question.findByPk(answer.questionID);
            const myAnswer = await answer.getAnswer();
            return {
                qID: question.qID,
                ans: question.answerType === 'options' ? myAnswer.optID : '<*>'
            }
        })
    }

    if(format === 'csv') data = parser.parse(data);
    
    return res.status(200).json(data);
}

exports.getAnswers = async (req, res) => {
    const format = req.query.format;
    const questionnaireID = req.params.questionnaireID;
    const qID = req.params.questionID;

    const survey = await Questionnaire.findOne({where: {questionnaireID}});
    if(!survey) return res.status(402).json({message: 'no such survey'});

    const questions = await survey.getQuestions({where: {qID}});
    if(!questions.length) return res.status(400).json({message: 'no such question'});
    const question = questions[0];

    const answers = await UniqueAnswer.findAll({where: {questionID: question.id}});

    let data = {
        questionnaireID,
        questionID: qID,
        answers: answers.map(async answer => {
            const session = await answer.getSession();
            const myAnswer = await answer.getAnswer();
            return {
                session: session.ses,
                ans: question.answerType === 'options' ? myAnswer.optID : '<*>'
            }
        })
    }

    res.set('Content-Type', 'application/json');
    if(format === 'csv') {
        data = parser.parse(data);
        res.set('Content-Type', 'text/csv');
    }

    return res.status(200).send(data);
}