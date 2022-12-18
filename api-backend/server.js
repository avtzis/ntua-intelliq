const app = require('./app');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { db } = require('./utilities/database');

try {
    db.authenticate();
    db.sync({force: true});
    console.log('Connection with the database has been established successfully');
} catch(err) {console.error('Unable to connect to the database:', err);}

const myServer = https.createServer(
    {
        key: fs.readFileSync(path.join(__dirname, './certificates', 'server.key')),
        cert: fs.readFileSync(path.join(__dirname, './certificates', 'server.cert'))
    },
    app
    );
    
const port = process.env.PORT || 9103;
myServer.listen(port, () => console.log(`Server started on port ${port}`));