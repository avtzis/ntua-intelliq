const app = require('./app');
const https = require('https');
const fs = require('fs');
const { verifyDB } = require('./utilities/database');

const myServer = https.createServer({
        key: fs.readFileSync('./certificates/server.key'/* path.join(__dirname, './certificates', 'server.key') */),
        cert: fs.readFileSync('./certificates/server.cert'/* path.join(__dirname, './certificates', 'server.cert') */)
    }, app
    );
    
const port = process.env.PORT || 9103;
myServer.listen(port, () => {
    console.log(`Server started on port ${port}`);
    verifyDB();
});