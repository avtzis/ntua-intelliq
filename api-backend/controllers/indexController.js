const { Sequelize, Model, DataTypes } = require("sequelize");
const {db, Question, Answer, Session, Questionnaire, Administrator, Token} = require('../utilities/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const administrator = require("../models/administrator");

exports.layout = async (req, res, next) => {
    const q = await Question.create({title: 'How many screens do you have'});
    const a1 = await q.createAnswer({title: '1'})
    const a2 = await q.createAnswer({title: '2'})
    const a3 = await q.createAnswer({title: '3'})
    await a1.setNextQuestion(q);
    await a2.setNextQuestion(q);
    await a3.setNextQuestion(q);

    const s = await Session.create();
    await s.addAnswers([a1, a2, a3]);

    const sessionAnswers = await s.getAnswers()
    //const myjson = sessionAnswers.toJSON();
    
    res.status(200).json(sessionAnswers);
};

/* exports.createSurvey = async (req, res, next) => {
    const title = req.body.questionnaireTitle;
    const about = req.body.about;
    const keywords = req.body.keywords;
    const questions = req.body.questions;

    const survey = await Questionnaire.create({
        title,
        about
    });

    keywords.forEach(async keyword => {
        await survey.createKeyword({title: keyword});
    });

    questions.forEach(async (question, index) => {
        const myQuestion = await survey.createQuestion({
            title: question.title,
            required: question.required,
            type: question.type
        })
        question.answers.forEach(async answer => {
            await myQuestion.createAnswer({title: answer.title})
        }); 
    });
    
    let myQuestions;
    do {
        myQuestions = await survey.getQuestions();
        if(myQuestions.length < questions.length) continue;
        myQuestions.forEach(async (question, indexQ) => {
            const myAnswers = await question.getAnswers();
            myAnswers.forEach(async (answer, indexA) => {
                await answer.setNextQuestion(myQuestions[questions[indexQ].answers[indexA].nextQuestion])
            });
        });
    } while(myQuestions.length < questions.length);

    res.status(201).json(myQuestions);
} */

exports.createSurvey = (req, res) => {
    const title = req.body.questionnaireTitle;
    const about = req.body.about;
    const keywords = req.body.keywords;
    const questions = req.body.questions;

    Questionnaire.create({
        title,
        about
    }).then(survey => {
        keywords.forEach(async keyword => {
            await survey.createKeyword({title: keyword});
        });
        return survey;
    }).then(survey => {
        questions.forEach(async question => {
            const myQuestion = await survey.createQuestion({
                title: question.title,
                required: question.required,
                type: question.type
            })
            question.answers.forEach(async answer => {
                await myQuestion.createAnswer({title: answer.title})
            })
        })
        return survey;
    }).then(survey => {
        survey.getQuestions().then(myQuestions => {
            myQuestions.forEach(async (question, indexQ) => {
                const myAnswers = await question.getAnswers();
                myAnswers.forEach(async (answer, indexA) => {
                    await answer.setNextQuestion(myQuestions[questions[indexQ].answer[indexA].nextQuestion])
                })
            })
        })
        return survey;
    }).then(survey => res.status(201).json({message: 'survey created successfully', survey}))
    .catch(err => res.status(500).json({message: 'internal server error', err}));
}

exports.getSurvey = async (req, res, next) => {
    const survey = await Questionnaire.findByPk(1);
    const questions = await survey.getQuestions();
    const keywords = await survey.getKeywords();

    const myKeywords = [];
    keywords.forEach(keyword => {
        myKeywords.push(keyword.title);
    })

    const myQuestions = [];
    questions.forEach(question => {
        myQuestions.push({
            qID: String(question.id),
            qtext: question.title,
            required: question.required,
            type: question.type
        })
    })

    const myjson = {
        questionnaireID: String(survey.id),
        questionnaireTitle: survey.title,
        keywords: myKeywords,
        questions: myQuestions
    }

    res.status(200).json(myjson);
};

exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!(username && password)) return res.status(402).json({message: 'not enough paramaters'});

    Administrator.findOne({where: {username}}).then(admin => {
        if(!admin) return {admin: null, match: false};
        else return {admin: admin, match: bcrypt.compare(password, admin.password)};
    }).then(({admin, match}) => {
        if(match) {
            const token = jwt.sign({username}, 'secret');
            admin.createToken({token, role: 'admin'}).then(() => res.status(200).json({token}));
        } else {
            res.status(401).json({message: 'wrong credentials'})
        }
    })
}

exports.logout = (req, res) => {
    const token = req.header('X-OBSERVATORY-AUTH');

    if(!token) 
        return res.status(401).json({message: 'no token'});
    else
        Token.findOne({where: {token}}).then(myToken => {
            if(!myToken)
                return res.status(401).json({message: 'invalid token'});
            else {
                try {myToken.destroy().then(() => res.status(200).json({message: 'successful logout'}))}
                catch (err) {res.status(500).json({message: 'internal server error'})}
            }
        }).catch(err => {res.status(500).json({message: 'internal server error'})})
}

exports.register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    Administrator.create({
        username,
        email,
        password
    }).then(user => {
        res.status(201).json({
            message: "admin successfully created",
            username: user.username
        })
    }).catch(err => res.status(500).json({message: 'internal server error', err}));
}