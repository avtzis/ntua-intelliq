const express = require('express');

// Controllers
const adminController = require('../controllers/adminController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authAdmin = require('../middleware/authorizeAdmin');

// Router
const router = express.Router();

// Requests
router.get('/healthcheck', authenticate, authAdmin, adminController.getHealthCheck);
router.post('/questionnaire_upd', authenticate, authAdmin, adminController.postSurvey);
router.post('/resetall', authenticate, authAdmin, adminController.serverReset);
router.post('/resetq/:questionnaireID', authenticate, authAdmin, adminController.surveyReset);
router.post('/usermod/:username/:password', authenticate, authAdmin, adminController.userMod);
router.get('/users/:username', authenticate, authAdmin, adminController.getUser);

router.get('/', authenticate, authAdmin, adminController.getAdmin);
router.post('/updateCorp', authenticate, authAdmin, adminController.updateCorp);

module.exports = router;