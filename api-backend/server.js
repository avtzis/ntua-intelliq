const app = require('./app');
const https = require('https');
const fs = require('fs');
const { verifyDB } = require('./utilities/database');
const inquirer = require('inquirer');
require('custom-env').env('staging');

const myServer = https.createServer({
        key: fs.readFileSync('./certificates/server.key'),
        cert: fs.readFileSync('./certificates/server.cert')
    }, app);
    
const port = process.env.PORT || 9103;
myServer.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log('Connecting to MySQL Database Server...');
    verifyDB();
});