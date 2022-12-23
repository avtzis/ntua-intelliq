const { Researcher, Questionnaire, Keyword } = require("../utilities/database");

exports.createSurvey = async (req, res) => {
    const username = req.user.username;
    const researcher = await Researcher.findOne({where: {username}});

    const title = req.body.questionnaireTitle;
    const about = req.body.about;
    const keywords = req.body.keywords;
    const questions = req.body.questions;

    if(!title) return res.status(400).json({message: 'title is required'});

    const survey = await researcher.createQuestionnaire({title, about});

    for(const keyword of keywords) {
        const myKeyword = await Keyword.findOne({where: {title: keyword}});
        if(!myKeyword) myKeyword = await Keyword.create({title: keyword});
        await survey.addKeyword(myKeyword);
    }

    for(const question of questions) {
        const myQuestion = await survey.createQuestion({
            title: question.title,
            required: question.required,
            type: question.type
        });
        for(const answer of question.answers) {
            await myQuestion.createAnswer({title: answer.title});
        }
    }

    let iQ = 0, iA = 0;
    const myQuestions = await survey.getQuestions();
    for(const question of myQuestions) {
        const myAnswers = await question.getAnswers();
        iA = 0;
        for(const answer of myAnswers) {
            const nextQuestionIndex = Number(questions[iQ].answers[iA].nextQuestion);
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

exports.publishSurvey = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const researcher = await Researcher.findOne({where: {username}});
    const surveys = await researcher.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    survey.published = true;
    await survey.save();

    return res.status(200).json({message: 'survey has been successfully published'});
}