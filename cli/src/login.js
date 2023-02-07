const axios = require('axios');
const api = require('../utilities/api');
const https = require('https');
const fs = require('fs');
const tokenpath = require('../utilities/tokenpath');

module.exports = options => {
    axios.post(api + '/login', {
        username: options.username,
        password: options.passw
    }, {
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(response => {
        console.log(response.data.message);
        fs.writeFile(tokenpath, response.data.token, () => {});
    }).catch(err => {
        console.error(err.response.data.message);
    })
}