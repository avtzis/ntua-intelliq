const axios = require('axios');
const api = require('../utilities/api');
const https = require('https');
const fs = require('fs');
const tokenpath = require('../utilities/tokenpath');

module.exports = options => {
    let token;
    try {
        token = fs.readFileSync(tokenpath);
    } catch(err) {
        return console.error('not logged in');
    }
    
    const username = options.username;
    const password = options.passw;
    
    axios.post(api + '/admin/usermod/' + username + '/' + password, {}, {
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
        headers: {'X-OBSERVATORY-AUTH': token}
    }).then(response => {
        console.log(response.data);
    }).catch(err => {
        console.error(err.response.data);
    });
}