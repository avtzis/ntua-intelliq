const mysql = require('mysql2');
const {dbconnection} = require('./utilities/database');

const connection = mysql.createConnection({
    host: dbconnection.host,
    port: dbconnection.port,
    user: dbconnection.user,
    password: dbconnection.password
});

connection.query('CREATE DATABASE IF NOT EXISTS softeng2234', (err, result) => {
    if(err) {
        console.error(err);
    } else {
        console.log('Database verified.');
    }   
    process.exit();
});