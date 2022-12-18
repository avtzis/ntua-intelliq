const { User, Administrator, Researcher, Token } = require("../utilities/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.layout = (req, res) => {}

exports.registerLayout = (req, res) => {}

exports.register = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!(username && password)) 
        return res.status(402).json({message: 'not enough paramaters'});

    User.create({
        username,
        password
    }).then(user => {
        res.status(201).json({
            message: "user successfully created",
            username: user.username,
            role: 'user'
        })
    }).catch(err => res.status(500).json({message: 'internal server error', err}));
}

exports.loginLayout = (req, res) => {}

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!(username && password)) 
        return res.status(402).json({message: 'not enough paramaters'});

    const admin = await Administrator.findOne({where: {username}});
    const researcher = await Researcher.findOne({where: {username}});
    const user = await User.findOne({where: {username}});

    if(admin) {
        if(bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({username}, 'secret');
            try {
                await admin.createToken({token, username, role: 'admin'});
            } catch(err) {return res.status(400).json({message: 'already logged in'})}
            return res.status(200).json({username, role: 'admin', token});
        } else {
            return res.status(401).json({message: 'wrong credentials'});
        }
    }

    if(researcher) {
        if(bcrypt.compare(password, researcher.password)) {
            const token = jwt.sign({username}, 'secret');
            try {
                await researcher.createToken({token, username, role: 'researcher'});
            } catch(err) {return res.status(400).json({message: 'already logged in'})}
            return res.status(200).json({username, role: 'researcher', token});
        } else {
            return res.status(401).json({message: 'wrong credentials'});
        }
    }

    if(user) {
        if(bcrypt.compare(password, user.password)) {
            const token = jwt.sign({username}, 'secret');
            try {
                await user.createToken({token, username, role: 'user'});
            } catch(err) {return res.status(400).json({message: 'already logged in'})}
            return res.status(200).json({username, role: 'user', token});
        } else {
            return res.status(401).json({message: 'wrong credentials'});
        }
    }

    else return res.status(401).json({message: 'no such user'});
}

exports.logout = async (req, res) => {
    const token = req.header('X-OBSERVATORY-AUTH');

    if(!token) 
        return res.status(401).json({message: 'no token'});
    else {
        const myToken = await Token.findOne({where: {token}});
        if(!myToken) 
            return res.status(401).json({message: 'invalid token'});
        else {
            await myToken.destroy().catch(err => res.status(500).json({message: 'internal server error'}));
            return res.status(200).json({message: 'logout successful'});
        }
    }
}

exports.getSurvey = (req, res) => {}

exports.getQuestion = (req, res) => {}

exports.postAnswer = (req, res) => {}

exports.getSessionAnswers = (req, res) => {}

exports.getAnswers = (req, res) => {}