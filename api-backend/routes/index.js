const express = require('express');

//controllers

//middleware

//router
const router = express.Router();

//requests
router.get('/', (req, res) => {res.status(200).json({message: 'hello'})});

module.exports = router;