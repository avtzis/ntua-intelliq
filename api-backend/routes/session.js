const express = require('express');

// Controllers
const sessionController = require('../controllers/sessionController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authUser = require('../middleware/authorizeUser');

// Router
const router = express.Router();

// Requests
router.get('/:questionnaireID', authenticate, sessionController.newSession);
router.get('/:questionnaireID/currentQuestion', authenticate, sessionController.getCurrentQuestion);
router.post('/:questionnaireID/submitAnswer', authenticate, sessionController.postAnswer);
router.post('/:questionnaireID/postPrevious', authenticate, sessionController.postPrevious);
router.post('/:questionnaireID/submitSurvey', authenticate, sessionController.postSubmit);

module.exports = router;