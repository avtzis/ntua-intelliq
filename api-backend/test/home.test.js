const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const https = require('https');
const { Questionnaire, User, Session, UniqueAnswer } = require('../utilities/database');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

describe('Basic login test', () => {
    let token;

    after('delete created user', async () => {
        await User.destroy({where: {username: 'user-test'}});
    });

    it('register', done => {
        axios.post(api + '/register', {
            username: 'user-test',
            password: 'test'
        }, {httpsAgent}).then(response => {
            expect(response.status).to.equal(201);
            done();
        }).catch(err => done(err));
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
    it('verify login', done => {
        axios.get(api + '/verifyLogin', {
            httpsAgent,
            headers: {'X-OBSERVATORY-AUTH': token}
        }).then(response => {
            expect(response.status).to.equal(200);
            done();
        }).catch(err => done(err));
    });
    it('get available surveys to take', done => {
        axios.get(api + '/surveys', {
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