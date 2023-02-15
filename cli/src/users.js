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
    
    const username = options.users;
    const format = options.format;

    let query = '?format=json';
    if(format === 'csv') query = '?format=csv';
    
    axios.get(api + '/admin/users/' + username + query, {
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
        headers: {'X-OBSERVATORY-AUTH': token}
    }).then(response => {
        console.log(response.data);
    }).catch(err => {
        console.error(err.response.data);
    });
}