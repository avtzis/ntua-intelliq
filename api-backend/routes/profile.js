const express = require('express');

// Controllers
const profileController = require('../controllers/profileController');

// Middleware
const authenticate = require('../middleware/authenticate');
const authUser = require('../middleware/authorizeUser');

// Router
const router = express.Router();

// Requests
router.get('/', authenticate, authUser, profileController.profileLayout);
// router.get('/update', authenticate, authUser, profileController.updateProfileLayout);
router.post('update', authenticate, authUser, profileController.updateProfile);

module.exports = router;