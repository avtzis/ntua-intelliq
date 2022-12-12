const {Sequelize, DataTypes} = require('sequelize');
const db = require('./database');

// Models
const AdministratorModel = require('../models/administrator.js');
const ResearcherModel = require('../models/researcher.js');
const QuestionnaireModel = require('../models/questionnaire.js');
const QuestionModel = require('../models/question.js');
const AnswerModel = require('../models/answer.js');
const UserModel = require('../models/user.js');
const SessionModel = require('../models/session.js');
const UniqueAnswerModel = require('../models/unique-answer.js');

// Instances
const Administrator = AdministratorModel(db, DataTypes);
const Researcher = ResearcherModel(db, DataTypes);
const Questionnaire = QuestionnaireModel(db, DataTypes);
const Question = QuestionModel(db, DataTypes);
const Answer = AnswerModel(db, DataTypes);
const User = UserModel(db, DataTypes);
const Session = SessionModel(db, DataTypes);
const UniqueAnswer = UniqueAnswerModel(db, DataTypes);

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








module.exports = {
  Administrator,
  Researcher,
  Questionnaire,
  Question,
  Answer,
  User,
  Session,
  UniqueAnswer
}