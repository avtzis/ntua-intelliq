const app = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const myServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, './certificates', 'server.key')),
        cert: fs.readFileSync(path.join(__dirname, './certificates', 'server.cert'))
    },
    app
)

myServer.listen(port, () => console.log(`Server started on port ${port}`));