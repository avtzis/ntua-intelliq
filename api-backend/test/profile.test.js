const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const https = require('https');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

// GET: <api>/profile
describe('Profile: Get Profile info', () => {
    let token;
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
    it('get info', done => {
        axios.get(api + '/profile', {
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

// POST: <api>/profile/update
describe('Profile: Update Profile', () => {
    let token;
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
    it('update', done => {
        axios.post(api + '/profile/update', {
            name: 'test',
            surname: 'test',
            ageGroup: 'test',
            sex: 'test',
            city: 'test',
            state: 'test',
            education: 'test',
            income: 'test',
        }, {
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