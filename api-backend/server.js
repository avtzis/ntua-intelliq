const app = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { db, Administrator, verifyDB } = require('./utilities/database');

verifyDB();

const myServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, './certificates', 'server.key')),
        cert: fs.readFileSync(path.join(__dirname, './certificates', 'server.cert'))
    },
    app
    );
    
const port = process.env.PORT || 9103;
myServer.listen(port, () => console.log(`Server started on port ${port}`));