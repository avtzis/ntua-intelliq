const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const https = require('https');
const { Questionnaire, User, Session, UniqueAnswer } = require('../utilities/database');
const { response } = require('../app');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

let surveyID;
let token;

describe('Session: Take and submit an available survey', () => {
    let answer1ID;
    let answer1Title;
    let answer2ID;
    let answer2Title;

    before('initialise some models', async () => {
        //Create dummy survey
        const survey = await Questionnaire.create({
            title: 'Test Survey',
            published: true
        });
        surveyID = survey.id;
        const question = await survey.createQuestion({
            title: 'Test Question',
            type: 'question',
            required: 'true',
            answerType: 'options'
        });
        const answer1 = await question.createAnswer({title: 'Yes'});
        const answer2 = await question.createAnswer({title: 'No'});
        await survey.setFirstQuestion(question);
    
        //Create dummy user
        const user = await User.create({
            username: 'user-test',
            password: 'test'
        });
    });
    after('restore database to previous state', async () => {
        await Questionnaire.destroy({where: {title: 'Test Survey'}});
        await User.destroy({where: {username: 'user-test'}});
    })

    it('login', done => {
        axios.post(api + '/login', {
            username: 'user-test',
            password: 'test'
        }, {httpsAgent}).then(response => {
            token = response.data.token;
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('start session', done => {
        axios.get(api + '/session/' + surveyID, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            answer1ID = response.data.answers[0].id;
            answer1Title = response.data.answers[0].title;
            answer2ID = response.data.answers[1].id;
            answer2Title = response.data.answers[1].title;
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('answer first question', done => {
        axios.post(api + '/session/' + surveyID + '/submitAnswer', {
            answer: {
                id: answer1ID,
                context: answer1Title
            }
        }, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('go back to first question', done => {
        axios.post(api + '/session/' + surveyID + '/postPrevious', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            answer1ID = response.data.answers[0].id;
            answer1Title = response.data.answers[0].title;
            answer2ID = response.data.answers[1].id;
            answer2Title = response.data.answers[1].title;
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('answer with a different option', done => {
        axios.post(api + '/session/' + surveyID + '/submitAnswer', {
            answer: {
                id: answer2ID,
                context: answer2Title
            }
        }, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('submit survey', done => {
        axios.post(api + '/session/' + surveyID + '/submitSurvey', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
    it('logout', done => {
        axios.post(api + '/logout', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});