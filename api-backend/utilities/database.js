const mysql = require('mysql2');
const {Sequelize, Model, DataTypes} = require('sequelize');

const dbconnection = {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    user: 'user',
    password: 'user'
}

// Connect to MySQL server
const connection = mysql.createConnection(
    {
        host: dbconnection.host,
        user: dbconnection.user,
        password: dbconnection.password,
        port: dbconnection.port
    }
);

// Create database if it does not exist
connection.query('CREATE DATABASE IF NOT EXISTS intelliQ', (err, results) => {
    if(err) console.error(err);
    else console.log(results);
});

// Connect sequelize to database
const db = new Sequelize('intelliQ', 'user', 'user', {
    host: dbconnection.host,
    port: dbconnection.port,
    dialect: dbconnection.dialect
});

verifyDB = async () => {
    try {
        await db.authenticate();
        await db.sync({force: false, alter: true});
        //await Administrator.create({username: 'avtzis', password: 'nokiak123'});
        console.log('Connection with the database has been established successfully');
    } catch(err) {console.error('Unable to connect to the database:', err);}
}

// Models
const AdministratorModel = require('../models/administrator.js');
const QuestionnaireModel = require('../models/questionnaire.js');
const QuestionModel = require('../models/question.js');
const AnswerModel = require('../models/answer.js');
const UserModel = require('../models/user.js');
const SessionModel = require('../models/session.js');
const UniqueAnswerModel = require('../models/unique-answer.js');
const KeywordModel = require('../models/keyword.js')
const TokenModel = require('../models/token.js');

// Instances
const Administrator = AdministratorModel(db, DataTypes);
const Questionnaire = QuestionnaireModel(db, DataTypes);
const Question = QuestionModel(db, DataTypes);
const Answer = AnswerModel(db, DataTypes);
const User = UserModel(db, DataTypes);
const Session = SessionModel(db, DataTypes);
const UniqueAnswer = UniqueAnswerModel(db, DataTypes);
const Keyword = KeywordModel(db, DataTypes);
const Token = TokenModel(db, DataTypes);

// Associations
Administrator.hasMany(Questionnaire);
Questionnaire.belongsTo(Administrator/* , {onDelete: 'CASCADE'} */);

Questionnaire.hasMany(Question);
Question.belongsTo(Questionnaire/* , {onDelete: 'CASCADE'} */);

Question.hasMany(Answer);
Answer.belongsTo(Question/* , {onDelete: 'CASCADE'} */);

Question.hasMany(Answer, {as: 'originAnswer', foreignKey: 'nextQuestionId'});
Answer.belongsTo(Question, {as: 'nextQuestion', foreignKey: 'nextQuestionId'});

Answer.hasMany(UniqueAnswer/* , {onDelete: 'SET NULL'} */);
UniqueAnswer.belongsTo(Answer/* , {onDelete: 'SET NULL'} */);

User.hasMany(Session);
Session.belongsTo(User);

Session.hasMany(UniqueAnswer);
UniqueAnswer.belongsTo(Session, {onDelete: 'CASCADE'});

Questionnaire.hasMany(Session);
Session.belongsTo(Questionnaire);

User.belongsToMany(Questionnaire, {through: Session});
Questionnaire.belongsToMany(User, {through: Session});

Session.belongsToMany(Answer, {through: UniqueAnswer});
Answer.belongsToMany(Session, {through: UniqueAnswer});

Questionnaire.belongsToMany(Keyword, {through: 'Survey_Keyword'});
Keyword.belongsToMany(Questionnaire, {through: 'Survey_Keyword'});

Administrator.hasMany(Token);
User.hasMany(Token);
Token.belongsTo(User);
Token.belongsTo(Administrator);

Questionnaire.belongsTo(Question, {as: 'firstQuestion', foreignKey: 'firstQuestionId'});
Question.hasOne(Questionnaire, {as: 'firstQuestionInSurvey', foreignKey: 'firstQuestionId'});

Question.hasMany(Session, {as: 'currentQuestionInSession', foreignKey: 'currentQuestionId'})
Session.belongsTo(Question, {as: 'currentQuestion', foreignKey: 'currentQuestionId'});

Question.belongsTo(Question, {as: 'ifSkippedNextQuestion', foreignKey: 'ifSkippedNextQuestionId'});
Question.hasMany(Question, {as: 'originQuestion', foreignKey: 'ifSkippedNextQuestionId'});


module.exports = {
    db,
    dbconnection,
    verifyDB,
    Administrator,
    Questionnaire,
    Question,
    Answer,
    User,
    Session,
    UniqueAnswer,
    Keyword,
    Token
}