const express = require('express');

//controllers
const indexController = require('../controllers/indexController');

//middleware

//router
const router = express.Router();

//requests
router.get('/', indexController.layout);

module.exports = router;