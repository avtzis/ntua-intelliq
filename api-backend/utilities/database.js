const mysql = require('mysql2');
const {Sequelize, Model, DataTypes} = require('sequelize');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'user',
        password: 'user',
        port: '3306'
    }
);

connection.query('CREATE DATABASE IF NOT EXISTS intelliQ', (err, results) => {
    console.log(results);
    console.error(err);
});

const sequelize = new Sequelize('intelliQ', 'user', 'user', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

module.exports = sequelize;