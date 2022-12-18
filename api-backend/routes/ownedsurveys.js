const express = require('express');

// Controllers
const sessionController = require('../controllers/sessionController');
const surveyController = require('../controllers/surveyController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authResearcher = require('../middleware/authorizeResearcher');

// Router
const router = express.Router();

// Requests
router.get('/', authenticate, authResearcher, surveyController.ownedSurveysLayout);
router.get('/survey/:id', authenticate, authResearcher, surveyController.getSurveyInfo);
//download format??
router.post('/survey/:id/update', authenticate, authResearcher, surveyController.updateSurvey);
router.post('/survey/:id/delete', authenticate, authResearcher, surveyController.deleteSurvey);
router.get('/survey/:id/answers', authenticate, authResearcher, surveyController.getSurveyAnswers);
//filters?? graphs??

router.get('/createSurvey', authenticate, authResearcher, surveyController.createSurveyLayout);
router.post('/createSurvey', authenticate, authResearcher, surveyController.createSurvey);

module.exports = router;