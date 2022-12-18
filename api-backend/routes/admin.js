const express = require('express');

// Controllers
const adminController = require('../controllers/adminController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authAdmin = require('../middleware/authorizeAdmin');

// Router
const router = express.Router();

// Requests
router.get('/', adminController.layout);
router.get('/serverstatus', authenticate, authAdmin, adminController.statusLayout);
router.get('/healthcheck', authenticate, authAdmin, adminController.healthcheck);
router.post('/questionnaire_upd', authenticate, authAdmin, adminController.postSurvey);
router.post('/resetall', authenticate, authAdmin, adminController.serverReset);
router.post('/resetq/:questionnaireID', authenticate, authAdmin, adminController.surveyReset);
router.post('/usermod/:username/:password', authenticate, authAdmin, adminController.usermod);
router.get('/users/:username', authenticate, authAdmin, adminController.usermod);

module.exports = router;