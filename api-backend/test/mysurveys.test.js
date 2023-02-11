const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const https = require('https');
const { Questionnaire, User, Session, UniqueAnswer } = require('../utilities/database');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

let surveyID;

// GET: <api>/mysurveys
describe('MySurveys: Get answered surveys', () => {
    let token;

    before('initialise some models', async () => {
        //Create dummy survey
        const survey = await Questionnaire.create({
            title: 'Test Survey'
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
    
        //Create dummy user
        const user = await User.create({
            username: 'user-test',
            password: 'test'
        });
    
        //Create dummy session
        const session = await user.createSession({
            questionnaireId: survey.id, 
            finished: true,
            submitted: true,
            ses: 'TEST'
        });
        const uAnswer = await UniqueAnswer.create({
            context: answer1.title,
            questionID: question.id,
            sessionId: session.id,
            answerId: answer1.id
        });
    });

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
    it('get surveys', done => {
        axios.get(api + '/mysurveys', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
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

// GET: <api>/mysurveys/survey/:id
describe('MySurveys: Get answered survey', () => {
    let token;
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
    it('get survey', done => {
        axios.get(api + '/mysurveys/survey/' + surveyID, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
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

// GET: <api>/mysurveys/survey/:id/export
describe('MySurveys: Get answered survey customised', () => {
    let token;
    
    after('restore everything to previous state', async () => {
        await Questionnaire.destroy({where: {title: 'Test Survey'}});
        await User.destroy({where: {username: 'user-test'}});
        await Session.destroy({where: {ses: 'TEST'}});
    });
    
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
    it('get survey', done => {
        axios.get(api + '/mysurveys/survey/' + surveyID + '/export', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
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