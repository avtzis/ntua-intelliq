const { db, dbconnection, Answer, Keyword, Question, Questionnaire, Session, Token, UniqueAnswer, User, Administrator } = require('../utilities/database');
const { Op } = require('sequelize');
const busboy = require('busboy');
const {Parser} = require('@json2csv/plainjs');
const parser = new Parser();

exports.getHealthCheck = async (req, res) => {
    const format = req.query.format;
    res.set('Content-Type', 'application/json');

    let data;
    try {
        await db.authenticate();
        data = {status: 'OK', dbconnection};
        if(format === 'csv') {
            data = parser.parse(data);
        res.set('Content-Type', 'text/csv');
        }
        return res.status(200).send(data);
    } catch(err) {
        data = {status: 'failed', dbconnection};
        if(format === 'csv') {
            data = parser.parse(data);
        res.set('Content-Type', 'text/csv');
        }
        return res.status(500).send(data);
    }
}

exports.postSurvey = async (req, res) => {
    const username = req.user.username;
    const admin = await Administrator.findOne({where: {username}});

    let bb;
    try {
        bb = busboy({headers: req.headers});
    } catch(err) {
        return res.status(400).json({message: 'invalid file', error: err});
    }

    bb.on('file', (name, file, info) => {
        const {filename, encoding, mimeType} = info;
        if(mimeType != 'application/json') return res.status(400).json({message: 'invalid JSON file'});
        file.on('data', async data => {
            const survey = JSON.parse(data.toString());
            
            const mySurvey = await admin.createQuestionnaire({
                title: survey.questionnaireTitle,
                questionnaireID: survey.questionnaireID,
                published: true
            });

            for(const keyword of survey.keywords) {
                let myKeyword = await Keyword.findOne({where: {title: keyword}});
                if(!myKeyword) myKeyword = await Keyword.create({title: keyword});
                await mySurvey.addKeyword(myKeyword);
            }

            for(const question of survey.questions) {
                const myQuestion = await mySurvey.createQuestion({
                    title: question.qtext,
                    required: question.required.toLowerCase(),
                    type: question.type,
                    qID: question.qID,
                });

                for(const answer of question.options) {
                    await myQuestion.createAnswer({
                        title: answer.opttxt,
                        optID: answer.optID,
                        nextqID: answer.nextqID
                    })
                    if(answer.opttxt === '<open string>') {
                        myQuestion.answerType = 'open text';
                        await myQuestion.save();
                    }
                }
            }

            const myQuestions = await mySurvey.getQuestions();
            for(let i in myQuestions) {
                const myAnswers = await myQuestions[i].getAnswers();
                for(let j in myAnswers) {
                    const nextQuestionIndex = myQuestions.indexOf(myQuestions.filter(myQuestion => myQuestion.qID === myAnswers[j].nextqID)[0]);
                    await myAnswers[j].setNextQuestion(myQuestions[nextQuestionIndex]);
                }
            }

            await mySurvey.setFirstQuestion(myQuestions[0]);
        }).on('close', () => {
            console.log('ok');
        })
    });

    bb.on('close', () => {
        res.status(201).json({message: 'ok'});
    });

    bb.on('error', error => {
        res.status(500).json({error});
    })
    
    req.pipe(bb);
}

exports.serverReset = async (req, res) => {
    const format = req.query.format;
    res.set('Content-Type', 'application/json');

    let data;
    try {
        await UniqueAnswer.destroy({where: {id: {[Op.gte]: 1}}});
        await Answer.destroy({where: {id: {[Op.gte]: 1}}});
        await Question.destroy({where: {id: {[Op.gte]: 1}}});
        await Keyword.destroy({where: {id: {[Op.gte]: 1}}});
        await Questionnaire.destroy({where: {id: {[Op.gte]: 1}}});
        await Session.destroy({where: {id: {[Op.gte]: 1}}});
        await User.destroy({where: {id: {[Op.gte]: 2}}});
        await Token.destroy({where: {role: 'user'}});

        data = {status: 'OK'};
        if(format === 'csv') {
            data = parser.parse(data);
            res.set('Content-Type', 'text/csv');
        }
        return res.status(200).send(data);
    } catch(err) {
        data = {status: 'failed', reason: err};
        if(format === 'csv') {
            data = parser.parse(data);
            res.set('Content-Type', 'text/csv');
        }
        return res.status(500).send(data);
    }
}

exports.surveyReset = async (req, res) => {
    const format = req.query.format;
    const questionnaireID = req.params.questionnaireID;
    const survey = await Questionnaire.findOne({where: {questionnaireID}});
    res.set('Content-Type', 'application/json');
    let data;

    if(!survey) {
        data = {status: 'failed', reason: 'no such survey'};
        if(format === 'csv') {
            data = parser.parse(data);
            res.set('Content-Type', 'text/csv');
        }
        return res.status(400).send(data);
    }

    try {
        await Session.destroy({where: {questionnaireId: survey.id}});

        data = {status: 'OK'};
        if(format === 'csv') {
            data = parser.parse(data);
            res.set('Content-Type', 'text/csv');
        }
        return res.status(200).send(data);
    } catch(err) {
        data = {status: 'failed', reason: err};
        if(format === 'csv') {
            data = parser.parse(data);
            res.set('Content-Type', 'text/csv');
        }
        return res.status(500).send(data);
    }
}

exports.userMod = async (req, res) => {
    const username = req.params.username;
    const password = req.params.password;

    if(!username || !password) return res.status(400).json({message: 'not enough parameters'});

    const admin = await Administrator.findOne({where: {username}});
    if(admin) {
        admin.password = password;
        await admin.save();

        return res.status(201).json({message: 'password has been successfully changed'});
    } else {
        const user = await User.findOne({where: {username}});
        if(user) await user.destroy();

        await Administrator.create({username, password});

        return res.status(201).json({message: 'admin created successfully'})
    }
}

exports.getUser = async (req, res) => {
    const username = req.params.username;
    const format = req.query.format;
    res.set('Content-Type', 'application/json');
    
    let user = await User.findOne({where: {username}});
    if(!user) {
        user = await Administrator.findOne({where: {username}});
        if(!user) {
            let data = {message: 'no user'};
            if(format === 'csv') {
                data = parser.parse(data);
                res.set('Content-Type', 'text/csv');
            }
            return res.status(402).send(data);
        }
    }
    
    if(format === 'csv') {
        user = parser.parse(user.toJSON());
        res.set('Content-Type', 'text/csv');
    }

    return res.status(200).send(user);
}

exports.getAdmin = async (req, res) => {
    const username = req.user.username;
    const admin = await Administrator.findOne({where: {username}});
    return res.status(200).json(admin);
}

exports.updateCorp = async (req, res) => {
    const username = req.user.username;
    const corporation = req.body.corporation;

    const admin = await Administrator.findOne({where: {username}});
    admin.corporation = corporation;
    await admin.save();

    return res.status(201).json({message: 'info updated successfully'});
}