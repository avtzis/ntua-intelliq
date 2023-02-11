const axios = require('axios');
const expect = require('chai').expect;
const api = require('../utilities/api');
const fs = require('fs');
const FormData = require('form-data');
const https = require('https');
const { Administrator, User } = require('../utilities/database');
const httpsAgent = new https.Agent({rejectUnauthorized: false});

// GET: <api>/admin/healtcheck
describe('Admin: Healthcheck', () => {
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
    it('healthcheck', done => {
        axios.get(api + '/admin/healthcheck', {
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

// POST: <api>/admin/resetall
describe('Admin: Reset Database', () => {
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
    it('reset', done => {
        axios.post(api + '/admin/resetall', {}, {
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

// POST: <api>/admin/updateCorp
describe('Admin: Update Corporation Field', () => {
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
    it('update field', done => {
        axios.post(api + '/admin/updateCorp', {}, {
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

// GET: <api>/admin
describe('Admin: Get Admin Info', () => {
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
    it('request info', done => {
        axios.get(api + '/admin/', {
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

// POST: <api>/admin/questionnaire_upd
/* describe('Admin: Upload Questionnaire', () => { //???
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
    it('update field', done => {
        const file = fs.createReadStream('./test/qupd_test.json');
        let formData = new FormData();
        formData.append('file', file);

        axios.post(api + '/admin/questionnaire_upd', formData, {
            httpsAgent,
            headers: [
                {'X-OBSERVATORY-AUTH': token},
                {'Content-Type': 'multipart/form-data'}
            ]
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

// POST: <api>/admin/resetq/:questionnaireID
describe('Admin: Reset Survey Given Answers', () => {
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
    it('reset answers', done => {
        axios.post(api + '/admin/resetq/QQ000', {}, {
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
}); */

// POST: <api>/admin/usermod/:username/:password
describe('Admin: Usermod', () => {
    let token;

    after('delete created admin', done => {
        Administrator.destroy({where: {username: 'admin-test'}})
            .then(() => done())
            .catch(err => done(err));
    });

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
    it('create admin', done => {
        axios.post(api + '/admin/usermod/admin-test/test', {}, {
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
    it('login to created admin', done => {
        axios.post(api + '/login', {
            username: 'admin-test',
            password: 'test'
        }, {httpsAgent}).then(response => {
            token = response.data.token;
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

// GET: <api>/users/:username
describe('Admin: Get User Info', () => {
    let token;

    before('create dummy user', done => {
        User.create({
            username: 'user-test',
            password: 'test'
        }).then(() => done()).catch(err => done(err));
    })
    after('delete created user', done => {
        User.destroy({where: {username: 'user-test'}})
            .then(() => done())
            .catch(err => done(err));
    });

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
    it('get user info', done => {
        axios.get(api + '/admin/users/user-test', {
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