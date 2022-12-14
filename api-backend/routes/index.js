const express = require('express');

//controllers
const indexController = require('../controllers/indexController');

//middleware

//router
const router = express.Router();

//requests
router.get('/', indexController.layout);
router.get('/success', (req, res, next) => {res.status(200).json({message: 'success'})})
router.get('/fail', (req, res, next) => {res.status(400).json({message: 'fail'})})

router.post('/createSurvey', indexController.createSurvey);
router.get('/getSurvey', indexController.getSurvey);

router.post('/login', indexController.login);
router.post('/register', indexController.register);

module.exports = router;