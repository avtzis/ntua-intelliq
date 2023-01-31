const { User, Questionnaire, Session, Answer } = require('../utilities/database');

exports.newSession = async (req, res, next) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey) return res.status(400).json({message: 'no such survey'}); 

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
    if(!survey) return res.status(400).json({message: 'so such survey'});

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) return res.status(401).json({message: 'survey not started yet'});
    
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
        title: currentQuestion.title,
        required: currentQuestion.required,
        type: currentQuestion.type,
        answerType: currentQuestion.answerType,
        answers: options
    });
}

exports.postAnswer = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.questionnaireID;
    const answerID = req.body.answer.id;
    const answerContext = req.body.answer.context;

    if(typeof answerID == 'undefined') return res.status(400).json({message: 'no answer'});

    const user = await User.findOne({where: {username}});
    const survey = await Questionnaire.findByPk(surveyID);
    if(!survey) return res.status(400).json({message: 'no such survey'});

    const sessions = await user.getSessions({where: {questionnaireId: surveyID}});
    if(!sessions.length) return res.status(401).json({message: 'survey not started yet'});
    
    const session = sessions[0];
    if(session.submitted == true) return res.status(200).json({message: 'survey already submitted'});
    if(session.finished == true) return res.status(200).json({message: 'survey completed'});
    const currentQuestion = await session.getCurrentQuestion();

    const answers = await currentQuestion.getAnswers({where: {id: answerID}});
    if(!answers.length) return res.status(400).json({message: 'no such answer'});

    const answer = answers[0];
    await session.addAnswer(answer);

    const uniqueAnswers = await session.getUniqueAnswers({where: {answerId: answerID}});
    const uniqueAnswer = uniqueAnswers[0];
    uniqueAnswer.context = answerContext;
    await uniqueAnswer.save();

    const nextQuestion = await answer.getNextQuestion();
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
    if(!sessions.length) return res.status(401).json({message: 'survey not started yet'});

    const session = sessions[0];
    if(session.submitted == true) return res.status(200).json({message: 'survey already submitted'});
    if(session.finished != true) return res.status(400).json({message: 'survey not completed yet'});
    
    session.submitted = true;
    await session.save();

    return res.status(200).json({message: 'Survey submitted. Thank you for your participation!'});
}

exports.mySurveysLayout = async (req, res) => {
    const username = req.user.username;
    
    const user = await user.findOne({where: {username}});

    const sessions = await user.getSessions();

    return res.status(200).json({sessions});
}

exports.getSession = async (req, res) => {
    const username = req.user.username;
    const questionnaireId = req.params.id;
    
    const user = await user.findOne({where: {username}});

    const sessions = await user.getSessions({where: {questionnaireId}});

    return res.status(200).json({sessions});
}