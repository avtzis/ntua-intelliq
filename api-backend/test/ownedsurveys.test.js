const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const https = require('https');
const { Questionnaire, User, Session, UniqueAnswer } = require('../utilities/database');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

let surveyID;
let token;

// POST: <api>/ownedsurveys/createSurvey
describe('OwnedSurveys: Create a Survey', () => {
    it('login', done => {
        axios.post(api + '/login', {
            username: 'admin',
            password: 'admin'
        }, {httpsAgent}).then(response => {
            token = response.data.token;
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('create survey', done => {
        axios.post(api + '/ownedsurveys/createSurvey', {
            questionnaireTitle: 'Test Survey',
            about: 'This is a a test survey.',
            keywords: ['test'],
            questions: [
                {
                    title: 'Test Question 1',
                    required: 'true',
                    type: 'question',
                    answerType: 'options',
                    answers: [
                        {
                            title: 'Yes',
                            nextQuestion: 1
                        },
                        {
                            title: 'No',
                            nextQuestion: '0'
                        }
                    ]
                },
                {
                    title: 'Test Question 2',
                    required: 'true',
                    type: 'profile',
                    answerType: 'open text',
                    answers: [
                        {
                            title: '<open string>',
                            nextQuestion: '0'
                        }
                    ]
                }
            ]
        }, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            surveyID = response.data.id;
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
});

// GET: <api>/ownedsurveys
describe('OwnedSurveys: Get all owned surveys', () => {
    it('get surveys', done => {
        axios.get(api + '/ownedsurveys', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});

// GET: <api>/ownedsurveys/exportUnpublished
describe('OwnedSurveys: Get all unpublished surveys customised', () => {
    it('get surveys', done => {
        axios.get(api + '/ownedsurveys/exportUnpublished', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});

// GET: <api>/ownedsurveys/survey/:id
describe('OwnedSurveys: Get an owned survey', () => {
    it('get survey', done => {
        axios.get(api + '/ownedsurveys/survey/' + surveyID, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});

// GET: <api>/ownedsurveys/survey/:id/export
describe('OwnedSurveys: Get an owned survey customised', () => {
    it('get survey', done => {
        axios.get(api + '/ownedsurveys/survey/' + surveyID + '/export', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});

// POST: <api>/ownedsurveys/survey/:id/update
describe('OwnedSurveys: Update an owned survey', () => {
    it('update survey', done => {
        axios.post(api + '/ownedsurveys/survey/' + surveyID + '/update', {
            title: 'Test Survey Edited'
        }, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
});

// POST: <api>/ownedsurveys/survey/:id/publish
describe('OwnedSurveys: Publish an owned survey', () => {
    it('publish survey', done => {
        axios.post(api + '/ownedsurveys/survey/' + surveyID + '/publish', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
});

// GET: <api>/ownedsurveys/exportPublished
describe('OwnedSurveys: Get all published surveys customised', () => {
    it('get surveys', done => {
        axios.get(api + '/ownedsurveys/exportPublished', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});

// GET: <api>/ownedsurveys/survey/:id/answers
describe('OwnedSurveys: Get answers given of an owned survey', () => {
    it('get answers', done => {
        axios.get(api + '/ownedsurveys/survey/' + surveyID + '/answers', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
});

// POST: <api>/ownedsurveys/survey/:id/withdraw
describe('OwnedSurveys: Withdraw an owned survey', () => {
    it('withdraw survey', done => {
        axios.post(api + '/ownedsurveys/survey/' + surveyID + '/withdraw', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
});

// POST: <api>/ownedsurveys/survey/:id/delete
describe('OwnedSurveys: Delete an owned survey', () => {
    it('delete survey', done => {
        axios.post(api + '/ownedsurveys/survey/' + surveyID + '/delete', {}, {
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
