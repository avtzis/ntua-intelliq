const express = require('express');

// Controllers
const mainController = require('../controllers/mainController');
const basicController = require('../controllers/basicController')

// Middleware
const authenticate = require('../middleware/authenticate');

// Router
const router = express.Router();

// Requests
router.get('/', mainController.layout);
router.post('/register', mainController.register);
router.post('/login', mainController.login);
router.post('/logout', mainController.logout);
router.get('/verifyLogin', authenticate, mainController.verifyLogin);
router.get('/surveys', mainController.getAllSurveys);

router.get('/questionnaire/:questionnaireID', authenticate, basicController.getSurvey);
router.get('/question/:questionnaireID/:questionID', authenticate, basicController.getQuestion);
router.post('/doanswer/:questionnaireID/:questionID/:session/:optionID', authenticate, basicController.postAnswer);
router.get('/getsessionanswers/:questionnaireID/:session', authenticate, basicController.getSessionAnswers);
router.get('/getquestionanswers/:questionnaireID/:questionID', authenticate, basicController.getAnswers);

module.exports = router;