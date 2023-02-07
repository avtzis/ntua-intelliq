const { User, Questionnaire, Session, Answer, UniqueAnswer, Question } = require('../utilities/database');

exports.newSession = async (req, res, next) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey || !survey.published) return res.status(400).json({message: 'no such survey'}); 

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) {
        const session = await Session.create();
        await session.setQuestionnaire(survey);
        await session.setUser(user);
    
        const firstQuestion = await survey.getFirstQuestion();
        await session.setCurrentQuestion(firstQuestion);
    }

    return res.redirect('/intelliq_api/session/' + surveyID + '/currentQuestion');
}

exports.getCurrentQuestion = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey || !survey.published) return res.status(402).json({message: 'so such survey'});

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) return res.status(400).json({message: 'survey not started yet'});
    
    const session = sessions[0];
    if(session.submitted == true) return res.status(200).json({
        message: 'survey already submitted',
        finished: true,
        submitted: true
    });
    if(session.finished == true) return res.status(200).json({
        message: 'survey completed, please submit',
        finished: true,
        submitted: false
    });
    const currentQuestion = await session.getCurrentQuestion({include: {model: Answer}});

    let options = [];
    for(const answer of currentQuestion.answers) {
        options.push({
            id: answer.id,
            title: answer.title
        })
    }
    
    return res.status(200).json({
        id: currentQuestion.id,
        title: currentQuestion.title,
        required: currentQuestion.required,
        type: currentQuestion.type,
        answerType: currentQuestion.answerType,
        firstQuestion: currentQuestion.id === survey.firstQuestionId,
        answers: options
    });
}

exports.postAnswer = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;
    const answerID = req.body.answer.id;
    const answerContext = req.body.answer.context;

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey || !survey.published) return res.status(400).json({message: 'no such survey'});

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) return res.status(400).json({message: 'survey not started yet'});
    
    const session = sessions[0];
    if(session.submitted == true) return res.status(400).json({message: 'survey already submitted'});
    if(session.finished == true) return res.status(400).json({message: 'survey completed'});
    const currentQuestion = await session.getCurrentQuestion();

    let nextQuestion;
    const answers = await currentQuestion.getAnswers({where: {id: answerID}});
    if(!answers.length) {
        if(currentQuestion.required === 'true') {
            return res.status(400).json({message: 'no such answer'});
        } else {
            await session.createUniqueAnswer({skipped: 'true', questionID: currentQuestion.id});
            nextQuestion = await currentQuestion.getIfSkippedNextQuestion();
        }
    } else {
        const answer = answers[0];
        await session.addAnswer(answer);
    
        const uniqueAnswers = await session.getUniqueAnswers({where: {answerId: answerID}});
        const uniqueAnswer = uniqueAnswers[0];
        uniqueAnswer.context = answerContext;
        uniqueAnswer.questionID = currentQuestion.id;
        await uniqueAnswer.save();
    
        nextQuestion = await answer.getNextQuestion();
    }

    if(!nextQuestion) {
        session.finished = true;
        await session.save();
    } else {
        await session.setCurrentQuestion(nextQuestion);
    }

    return res.redirect('/intelliq_api/session/' + surveyID + '/currentQuestion');
}

exports.postSubmit = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey) return res.status(400).json({message: 'no such survey'});

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) return res.status(400).json({message: 'survey not started yet'});

    const session = sessions[0];
    if(session.submitted == true) return res.status(400).json({message: 'survey already submitted'});
    if(session.finished != true) return res.status(400).json({message: 'survey not completed yet'});
    
    session.submitted = true;
    await session.save();

    return res.status(201).json({message: 'Survey submitted. Thank you for your participation!'});
}

exports.mySurveysLayout = async (req, res) => {
    const username = req.user.username;
    
    const user = await User.findOne({where: {username}});

    const sessions = await user.getSessions({
        include: [
            {
                model: Questionnaire,
                where: {published: true},
                include: Question
            },
            {
                model: UniqueAnswer
            }
        ]
    });

    return res.status(200).json({sessions});
}

exports.getSession = async (req, res) => {
    const username = req.user.username;
    const questionnaireId = req.params.id;
    
    const user = await User.findOne({where: {username}});

    const sessions = await user.getSessions({
        where: {questionnaireId},
        include: [
            {
                model: Questionnaire,
                include: {
                    model: Question
                }
            },
            {
                model: UniqueAnswer,
            }
        ]
    });

    return res.status(200).json({sessions});
}

exports.getSessionExport = async (req, res) => {
    const username = req.user.username;
    const questionnaireId = req.params.id;

    const user = await User.findOne({where: {username}});

    const sessions = await user.getSessions({
        where: {questionnaireId},
        include: [
            {
                model: Questionnaire,
                include: {
                    model: Question,
                    include: Answer
                }
            },
            {
                model: UniqueAnswer
            }
        ]
    });
    if(!sessions.length) return res.status(400).json({message: 'survey not started yet'});
    const session = sessions[0];

    let p_index = 0;
    let q_index = 0;
    const data = {
        questionnaireID: 'QQ' + (session.questionnaireId > 99 ? session.questionnaireId : ('0' + (session.questionnaireId > 9 ? session.questionnaireId : ('0' + session.questionnaireId)))),
        session: session.id,
        answers: session.uniqueAnswers.map(uAnswer => {
            const myQuestion = session.questionnaire.questions.filter(question => question.id === uAnswer.questionID)[0];
            const qID = (myQuestion.type === 'question' ? ('Q' + (q_index > 9 ? q_index++ : ('0' + q_index++))) : ('P' + (p_index > 9 ? p_index++ : ('0' + p_index++))));
            const myAnswer = myQuestion.answers.filter(answer => answer.id === uAnswer.answerId)[0];
            const index = myQuestion.answers.indexOf(myAnswer) + 1;
            const answerType = myQuestion.answerType;
            return {
                qID,
                ans: answerType === 'options' ? (qID + 'A' + index) : '<*>'
            }
        })
    };

    return res.status(200).json(data);
}

exports.postPrevious = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey) return res.status(400).json({message: 'no such survey'});

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) return res.status(400).json({message: 'survey not started yet'});
    
    const session = sessions[0];
    if(session.submitted == true) return res.status(400).json({message: 'survey already submitted'});

    const lastQuestionID = await UniqueAnswer.max('questionID', {where: {sessionId: session.id}});
    const lastAnswer = await UniqueAnswer.findOne({
        where: {
            questionID: lastQuestionID,
            sessionId: session.id
        }
    });
    const lastQuestion = await Question.findByPk(lastAnswer.questionID);

    if(session.finished == true) {
        session.finished = false;
        await session.save();
    }

    await session.setCurrentQuestion(lastQuestion);
    await lastAnswer.destroy();

    return res.redirect('/intelliq_api/session/' + surveyID + '/currentQuestion');
}