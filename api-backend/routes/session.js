const express = require('express');

// Controllers
const sessionController = require('../controllers/sessionController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authUser = require('../middleware/authorizeUser');

// Router
const router = express.Router();

// Requests
router.post('/new/:questionnaireID', sessionController.newSession);

router.post('/:id/nextQuestion', authenticate, sessionController.postNextQuestion);
router.get('/:id/nextQuestion', authenticate, sessionController.getNextQuestion);

router.post('/:id/prevQuestion', authenticate, sessionController.postPrevQuestion);
router.get('/:id/prevQuestion', authenticate, sessionController.getPrevQuestion);

router.post('/:id/submitSurvey', authenticate, sessionController.postSubmit);
router.get('/finished', authenticate, sessionController.finishedLayout);

module.exports = router;