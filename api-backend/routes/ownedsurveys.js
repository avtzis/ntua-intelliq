const express = require('express');

// Controllers
const sessionController = require('../controllers/sessionController');
const surveyController = require('../controllers/surveyController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authAdmin = require('../middleware/authorizeAdmin');

// Router
const router = express.Router();

// Requests
router.get('/', authenticate, authAdmin, surveyController.ownedSurveysLayout);
router.get('/survey/:id/export', authenticate, authAdmin, surveyController.getSurveyInfo);
router.get('/exportPublished', authenticate, authAdmin, surveyController.getSurveysPublished);
router.get('/exportUnpublished', authenticate, authAdmin, surveyController.getSurveysUnpublished);
//download format??
router.get('/survey/:id', authenticate, authAdmin, surveyController.getSurvey);
router.post('/survey/:id/update', authenticate, authAdmin, surveyController.updateSurvey);
router.post('/survey/:id/delete', authenticate, authAdmin, surveyController.deleteSurvey);
router.get('/survey/:id/answers', authenticate, authAdmin, surveyController.getSurveyAnswers);
router.post('/survey/:id/publish', authenticate, authAdmin, surveyController.publishSurvey);
router.post('/survey/:id/withdraw', authenticate, authAdmin, surveyController.withdrawSurvey);

router.post('/createSurvey', authenticate, authAdmin, surveyController.createSurvey);

module.exports = router;