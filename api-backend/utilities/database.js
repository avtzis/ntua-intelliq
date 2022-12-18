const mysql = require('mysql2');
const {Sequelize, Model, DataTypes} = require('sequelize');

// Connect to MySQL server
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'user',
        password: 'user',
        port: '3306'
    }
);

// Create database if it does not exist
connection.query('CREATE DATABASE IF NOT EXISTS intelliQ', (err, results) => {
    console.log(results);
    console.error(err);
});

// Connect sequelize to database
const db = new Sequelize('intelliQ', 'user', 'user', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

// Models
const AdministratorModel = require('../models/administrator.js');
const ResearcherModel = require('../models/researcher.js');
const QuestionnaireModel = require('../models/questionnaire.js');
const QuestionModel = require('../models/question.js');
const AnswerModel = require('../models/answer.js');
const UserModel = require('../models/user.js');
const SessionModel = require('../models/session.js');
const UniqueAnswerModel = require('../models/unique-answer.js');
const KeywordModel = require('../models/keyword.js')
const TokenModel = require('../models/token.js');
const token = require('../models/token.js');

// Instances
const Administrator = AdministratorModel(db, DataTypes);
const Researcher = ResearcherModel(db, DataTypes);
const Questionnaire = QuestionnaireModel(db, DataTypes);
const Question = QuestionModel(db, DataTypes);
const Answer = AnswerModel(db, DataTypes);
const User = UserModel(db, DataTypes);
const Session = SessionModel(db, DataTypes);
const UniqueAnswer = UniqueAnswerModel(db, DataTypes);
const Keyword = KeywordModel(db, DataTypes);
const Token = TokenModel(db, DataTypes);

// Associations
Researcher.hasMany(Questionnaire);
Questionnaire.belongsTo(Researcher);

Questionnaire.hasMany(Question);
Question.belongsTo(Questionnaire);

Question.hasMany(Answer);
Answer.belongsTo(Question);

Question.hasMany(Answer, {as: 'originAnswer', foreignKey: 'nextQuestionId'});
Answer.belongsTo(Question, {as: 'nextQuestion', foreignKey: 'nextQuestionId'});

Answer.hasMany(UniqueAnswer);
UniqueAnswer.belongsTo(Answer);

User.hasMany(Session);
Session.belongsTo(User);

Session.hasMany(UniqueAnswer);
UniqueAnswer.belongsTo(Session);

Questionnaire.hasMany(Session);
Session.belongsTo(Questionnaire);

User.belongsToMany(Questionnaire, {through: Session, uniqueKey: 'sessionId'});
Questionnaire.belongsToMany(User, {through: Session, uniqueKey: 'sessionId'});

Session.belongsToMany(Answer, {through: UniqueAnswer, uniqueKey: 'uniqueAnswerId'});
Answer.belongsToMany(Session, {through: UniqueAnswer, uniqueKey: 'uniqueAnswerId'});

Questionnaire.hasMany(Keyword);
Keyword.belongsTo(Questionnaire);

Administrator.hasOne(Token);
Researcher.hasOne(Token);
User.hasOne(Token);
Token.belongsTo(User);
Token.belongsTo(Researcher);
Token.belongsTo(Administrator);

Session.hasOne(Token);
Token.belongsTo(Session);

module.exports = {
    db,
    Administrator,
    Researcher,
    Questionnaire,
    Question,
    Answer,
    User,
    Session,
    UniqueAnswer,
    Keyword,
    Token
}