const { Keyword, Administrator, Question, Answer, Questionnaire, Session, UniqueAnswer } = require("../utilities/database");

exports.createSurvey = async (req, res) => {
    const username = req.user.username;
    const admin = await Administrator.findOne({where: {username}});

    const title = req.body.questionnaireTitle;
    const about = req.body.about;
    const keywords = req.body.keywords;
    const questions = req.body.questions;

    if(!title) return res.status(400).json({message: 'title is required'});

    const survey = await admin.createQuestionnaire({title, about});

    for(const keyword of keywords) {
        let myKeyword = await Keyword.findOne({where: {title: keyword}});
        if(!myKeyword) myKeyword = await Keyword.create({title: keyword});
        await survey.addKeyword(myKeyword);
    }

    for(const question of questions) {
        const myQuestion = await survey.createQuestion({
            title: question.title,
            required: question.required,
            type: question.type,
            answerType: question.answerType
        });

        for(const answer of question.answers) {
            await myQuestion.createAnswer({title: answer.title});
        }
    }

    const myQuestions = await survey.getQuestions();
    for(let i in myQuestions) {
        if(questions[i].nextQuestionIfSkipped) {
            const nextQuestionIndex = Number(questions[i].nextQuestionIfSkipped);
            if(nextQuestionIndex > i) {
                await myQuestions[i].setIfSkippedNextQuestion(myQuestions[nextQuestionIndex]);
            }
        }

        const myAnswers = await myQuestions[i].getAnswers();
        for(let j in myAnswers) {
            const nextQuestionIndex = Number(questions[i].answers[j].nextQuestion);
            if(nextQuestionIndex > i) {
                await myAnswers[j].setNextQuestion(myQuestions[nextQuestionIndex]);
            }
        }
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

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    survey.published = true;
    await survey.save();

    return res.status(201).json({message: 'survey has been successfully published'});
}

exports.withdrawSurvey = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    survey.published = false;
    await survey.save();

    return res.status(201).json({message: 'survey has been successfully withdrawn'});
}

exports.deleteSurvey = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    await survey.destroy();
    
    return res.status(200).json({message: 'survey has been successfully deleted'});
}

exports.ownedSurveysLayout = async (req, res) => {
    const username = req.user.username;

    const admin = await Administrator.findOne({where: {username}});

    let unpublished = await admin.getQuestionnaires({
        where: {published: false},
        attributes: ['id', 'title'],
        include: {
            model: Question,
            attributes: ['title', 'type', 'required'],
            include: [
                {
                    model: Answer,
                    attributes: ['title'],
                    include: {
                        model: Question,
                        as: 'nextQuestion',
                        attributes: ['title']
                    }
                },
                {
                    model: Question,
                    as: 'ifSkippedNextQuestion',
                    attributes: ['title'],
                }
            ]
        }
    });
    for(let i in unpublished) {
        unpublished[i].dataValues.qCount = unpublished[i].questions.length;
        let aCount = 0;
        for(let j in unpublished[i].questions) {
            aCount += unpublished[i].questions[j].answers.length;
            unpublished[i].dataValues.questions[j].dataValues.qaCount = unpublished[i].questions[j].answers.length;
        }
        unpublished[i].dataValues.aCount = aCount;
    }

    let published = await admin.getQuestionnaires({
        where: {published: true},
        attributes: ['id', 'title'],
        include: {
            model: Question,
            attributes: ['title', 'type', 'required'],
            include: [
                {
                    model: Answer,
                    attributes: ['title'],
                    include: {
                        model: Question,
                        as: 'nextQuestion',
                        attributes: ['title']
                    }
                },
                {
                    model: Question,
                    as: 'ifSkippedNextQuestion',
                    attributes: ['title'],
                }
            ]
        },
    });
    for(let i in published) {
        published[i].dataValues.qCount = published[i].questions.length;
        let aCount = 0;
        for(let j in published[i].questions) {
            aCount += published[i].questions[j].answers.length;
            published[i].dataValues.questions[j].dataValues.qaCount = published[i].questions[j].answers.length;
        }
        published[i].dataValues.aCount = aCount;
    }

    return res.status(200).json({
        published,
        unpublished
    });
}

exports.getSurveyAnswers = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    const questions = await survey.getQuestions({
        include: {
            model: Answer
        }
    });

    let questionsData = [];
    for(let question of questions) {
        let answersData = [];
        for(let answer of question.answers) {
            if(question.answerType === 'options') {
                const count = await answer.countUniqueAnswers({
                    include: {
                        model: Session,
                        where: {submitted: true},
                        attributes: []
                    }
                });
                answersData.push({
                    id: answer.id,
                    title: answer.title,
                    answered: count
                });
            } else {
                const uniqueAnswers = await answer.getUniqueAnswers({
                    attributes: ['context'],
                    include: {
                        model: Session,
                        where: {submitted: true},
                        attributes: []
                    }
                });
                const uniqueAnswersData = uniqueAnswers.map(ans => ans.context);
                answersData.push({
                    id: answer.id,
                    context: uniqueAnswersData
                })
            }
        }

        questionsData.push({
            id: question.id,
            title: question.title,
            required: question.required,
            answerType: question.answerType,
            answers: answersData
        })
    }

    let data = {
        id: survey.id,
        title: survey.title,
        questions: questionsData
    }

    return res.status(200).json(data);
}

exports.getSurveyInfo = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    const questions = await survey.getQuestions();
    const keywords = await survey.getKeywords();

    let p_index = 0;
    let q_index = 0;
    const data = {
        questionnaireID: 'QQ' + (survey.id > 99 ? survey.id : ('0' + (survey.id > 9 ? survey.id : ('0' + survey.id)))),
        questionnaireTitle: survey.title,
        keywords: keywords.map(keyword => keyword.title),
        questions: questions.map(question => {
            return {
                qID: question.type === 'question' ? ('Q' + (q_index > 9 ? q_index++ : ('0' + q_index++))) : ('P' + (p_index > 9 ? p_index++ : ('0' + p_index++))),
                qText: question.title,
                required: question.required.toUpperCase(),
                type: question.type
            }
        })
    };

    return res.status(200).json(data);
}

exports.getSurvey = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = await Questionnaire.findOne({
        where: {id: surveyID},
        attributes: ['id', 'title', 'about'],
        include: [
            {
                model: Keyword,
                attributes: ['id', 'title']
            },
            {
                model: Question,
                attributes: ['id', 'title', 'type', 'required', 'answerType'],
                include: [
                    {
                        model: Answer,
                        attributes: ['id', 'title'],
                        include: {
                            model: Question,
                            as: 'nextQuestion',
                            attributes: ['id', 'title']
                        }
                    },
                    {
                        model: Question,
                        as: 'ifSkippedNextQuestion',
                        attributes: ['id', 'title']
                    }
                ]
            }
        ]
    });

    return res.status(200).json(survey);
}

exports.updateSurvey = async (req, res) => {
    const username = req.user.username;
    const surveyID = req.params.id;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {id: surveyID}});
    if(!surveys.length) return res.status(401).json({message: 'unauthorized request to survey'});

    const survey = surveys[0];
    const title = req.body.questionnaireTitle;
    const about = req.body.about;
    const keywords = req.body.keywords;
    const questions = req.body.questions;

    if(title) survey.title = title;
    if(about) survey.about = about;

    if(keywords) {
        for(const keyword of keywords) {
            const keywordExists = await survey.getKeywords({where: {title: keyword}});
            if(keywordExists.length === 0) {
                let myKeyword = await Keyword.findOne({where: {title: keyword}});
                if(!myKeyword) myKeyword = await Keyword.create({title: keyword});
                await survey.addKeyword(myKeyword);
            }
        }
    }

    if(questions) {
        const myQuestions = await survey.getQuestions();
        for(let i in myQuestions) {
            myQuestions[i].title = questions[i].title;
            myQuestions[i].type = questions[i].type;
            myQuestions[i].required = questions[i].required;
    
            const myAnswers = await myQuestions[i].getAnswers();
            for(let j in myAnswers) {
                myAnswers[j].title = questions[i].answers[j].title;
                await myAnswers[j].save();
            }
            await myQuestions[i].save();
        }
    
        for(let i in myQuestions) {
            if(questions[i].nextQuestionIfSkipped) {
                const nextQuestionIndex = Number(questions[i].nextQuestionIfSkipped);
                if(nextQuestionIndex > i) {
                    await myQuestions[i].setIfSkippedNextQuestion(myQuestions[nextQuestionIndex]);
                }
            }
    
            const myAnswers = await myQuestions[i].getAnswers();
            for(let j in myAnswers) {
                const nextQuestionIndex = Number(questions[i].answers[j].nextQuestion);
                if(nextQuestionIndex > i) {
                    await myAnswers[j].setNextQuestion(myQuestions[nextQuestionIndex]);
                }
            }
        }
    }

    return res.status(201).json({
        message: 'survey successfully updated', 
        id: survey.id,
        title: survey.title,
    })
}

exports.getSurveysPublished = async (req, res) => {
    const username = req.user.username;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {published: true}});
    if(!surveys.length) return res.status(401).json({message: 'no surveys'});

    let data = [];
    for(const survey of surveys) {
        const questions = await survey.getQuestions();
        const keywords = await survey.getKeywords();
    
        let p_index = 0;
        let q_index = 0;
        const myData = {
            questionnaireID: 'QQ' + (survey.id > 99 ? survey.id : ('0' + (survey.id > 9 ? survey.id : ('0' + survey.id)))),
            questionnaireTitle: survey.title,
            keywords: keywords.map(keyword => keyword.title),
            questions: questions.map(question => {
                return {
                    qID: question.type === 'question' ? ('Q' + (q_index > 9 ? q_index++ : ('0' + q_index++))) : ('P' + (p_index > 9 ? p_index++ : ('0' + p_index++))),
                    qText: question.title,
                    required: question.required.toUpperCase(),
                    type: question.type
                }
            })
        };

        data.push(myData);
    }

    return res.status(200).json(data);
}

exports.getSurveysUnpublished = async (req, res) => {
    const username = req.user.username;

    const admin = await Administrator.findOne({where: {username}});
    const surveys = await admin.getQuestionnaires({where: {published: false}});
    if(!surveys.length) return res.status(401).json({message: 'no surveys'});

    let data = [];
    for(const survey of surveys) {
        const questions = await survey.getQuestions();
        const keywords = await survey.getKeywords();
    
        let p_index = 0;
        let q_index = 0;
        const myData = {
            questionnaireID: 'QQ' + (survey.id > 99 ? survey.id : ('0' + (survey.id > 9 ? survey.id : ('0' + survey.id)))),
            questionnaireTitle: survey.title,
            keywords: keywords.map(keyword => keyword.title),
            questions: questions.map(question => {
                return {
                    qID: question.type === 'question' ? ('Q' + (q_index > 9 ? q_index++ : ('0' + q_index++))) : ('P' + (p_index > 9 ? p_index++ : ('0' + p_index++))),
                    qText: question.title,
                    required: question.required.toUpperCase(),
                    type: question.type
                }
            })
        };

        data.push(myData);
    }

    return res.status(200).json(data);
}