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
    
    const pathname = options.source;

    const file = fs.createReadStream(pathname);
    let formData = new FormData();
    formData.append('file', file);
    
    axios.post(api + '/admin/questionnaire_upd', formData, {
        httpsAgent: new https.Agent({rejectUnauthorized: false}),
        headers: [
            {'X-OBSERVATORY-AUTH': token},
            {'Content-Type': 'multipart/form-data'}
        ]
    }).then(response => {
        console.log(response.data);
    }).catch(err => {
        console.error(err.response.data);
    });
}