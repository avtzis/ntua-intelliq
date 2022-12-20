const express = require('express');

// Controllers
const mainController = require('../controllers/mainController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authResearcher = require('../middleware/authorizeResearcher');
const authUser = require('../middleware/authorizeUser');

// Router
const router = express.Router();

// Requests
router.get('/', mainController.layout); //list available surveys?

router.get('/register', mainController.registerLayout);
router.post('/register', mainController.register);

router.get('/login', mainController.loginLayout);
router.post('/login', mainController.login);

router.post('/logout', mainController.logout);

router.get('/questionnaire/:questionnaireID', authenticate, authResearcher, mainController.getSurvey);
router.get('/question/:questionnaireID/:questionID', authenticate, authResearcher, mainController.getQuestion);
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', authenticate, authUser, mainController.postAnswer);
router.get('/getsessionanswers/:questionnaireID/:session', authenticate, authUser, mainController.getSessionAnswers);
router.get('/getquestionanswers/:questionnaireID/:questionID', authenticate, authResearcher, mainController.getAnswers);

module.exports = router;