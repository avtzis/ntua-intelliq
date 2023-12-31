const express = require('express');

// Controllers
const sessionController = require('../controllers/sessionController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authUser = require('../middleware/authorizeUser');

// Router
const router = express.Router();

// Requests
router.get('/', authenticate, authUser, sessionController.mySurveysLayout);
router.get('/survey/:id', authenticate, authUser, sessionController.getSession);
router.get('/survey/:id/export', authenticate, authUser, sessionController.getSessionExport);

module.exports = router;