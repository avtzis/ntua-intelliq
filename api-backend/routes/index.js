const express = require('express');

//controllers
const indexController = require('../controllers/indexController');

//middleware
const authenticate = require('../middleware/authenticate');
const authAdmin = require('../middleware/authorizeAdmin');

//router
const router = express.Router();

//requests
router.get('/', indexController.layout);
router.get('/success', (req, res, next) => {res.status(200).json({message: 'success'})})
router.get('/fail', (req, res, next) => {res.status(400).json({message: 'fail'})})

router.post('/createSurvey', authenticate, authAdmin, indexController.createSurvey);
router.get('/getSurvey', indexController.getSurvey);

router.post('/login', indexController.login);
router.post('/logout', indexController.logout);
router.post('/register', indexController.register);

module.exports = router;