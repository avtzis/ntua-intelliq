const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const fs = require('fs');
const FormData = require('form-data');
const https = require('https');
const { Questionnaire, User } = require('../utilities/database');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

describe('Full Basic Test', () => {
    let token;

    after('delete created user', async () => {
        await User.destroy({where: {username: 'user-test'}});
    });
    after('delete created survey', async () => {
        await Questionnaire.destroy({where: {questionnaireID: 'QQ999'}});
    });

    it('login as admin', done => {
        axios.post(api + '/login', {
            username: 'admin',
            password: 'admin'
        }, {httpsAgent}).then(response => {
            token = response.data.token;
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('create a survey', done => {
        const file = fs.createReadStream('./test/qupd_test.json');
        const formData = new FormData();
        formData.append('file', file);

        axios.post(api + '/admin/questionnaire_upd', formData, {
            httpsAgent,
            headers: {
                'X-OBSERVATORY-AUTH': token,
                'Content-Type': 'multipart/form-data'
            }
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
    it('register as a new simple user', done => {
        axios.post(api + '/register', {
            username: 'user-test',
            password: 'test'
        }, {httpsAgent}).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
    it('login as newly created user', done => {
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
        axios.get(api + '/questionnaire/QQ999', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('get first question', done => {
        axios.get(api + '/question/QQ999/Q01', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('answer first question', done => {
        axios.post(api + '/doanswer/QQ999/Q01/TEST/Q01A1', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
    it('get second question', done => {
        axios.get(api + '/question/QQ999/Q02', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('answer second question', done => {
        axios.post(api + '/doanswer/QQ999/Q02/TEST/Q02A1', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
    it('get last question', done => {
        axios.get(api + '/question/QQ999/Q03', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('answer last question', done => {
        axios.post(api + '/doanswer/QQ999/Q03/TEST/Q03A1', {}, {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
    });
    it('get answers given in this session', done => {
        axios.get(api + '/getsessionanswers/QQ999/TEST', {
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
    it('login as admin', done => {
        axios.post(api + '/login', {
            username: 'admin',
            password: 'admin'
        }, {httpsAgent}).then(response => {
            token = response.data.token;
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('get every answer given in first question', done => {
        axios.get(api + '/getquestionanswers/QQ999/Q01', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('get every answer given in second question', done => {
        axios.get(api + '/getquestionanswers/QQ999/Q02', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('get every answer given in last question', done => {
        axios.get(api + '/getquestionanswers/QQ999/Q03', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('reset answers', done => {
        axios.post(api + '/admin/resetq/QQ999', {}, {
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