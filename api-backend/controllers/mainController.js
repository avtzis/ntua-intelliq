const { User, Administrator, Token, Questionnaire, Keyword } = require("../utilities/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const user = require("../models/user");

exports.layout = (req, res) => {}

exports.register = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.name;

    if(!(username && password)) 
        return res.status(402).json({message: 'not enough paramaters'});

    const someAdmin = await Administrator.findOne({where: {username}});
    const someUser = await User.findOne({where: {username}});
    if(someAdmin || someUser) return res.status(400).json({message: 'username already exists'});

    User.create({
        username,
        password,
        name,
        surname
    }).then(user => {
        res.status(201).json({
            message: "user successfully created",
            username: user.username,
            role: 'user'
        })
    }).catch(err => res.status(500).json({message: 'internal server error', err}));
}

exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if(!(username && password)) 
        return res.status(402).json({message: 'not enough paramaters'});

    const admin = await Administrator.findOne({where: {username}});
    const user = await User.findOne({where: {username}});

    if(admin) {
        if(await bcrypt.compare(password, admin.password)) {
            const token = jwt.sign({username}, 'secret');
            try {
                await admin.createToken({token, username, role: 'admin'});
            } catch(err) {return res.status(400).json({message: 'already logged in'})}
            return res.status(200).json({username, role: 'admin', token});
        } else {
            return res.status(401).json({message: 'wrong credentials'});
        }
    }

    if(user) {
        if(await bcrypt.compare(password, user.password)) {
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

exports.verifyLogin = (req, res) => {
    const username = req.user.username;
    const role = req.role;

    return res.status(200).json({
        loggedIn: true,
        username,
        role
    });
}

exports.getAllSurveys = async (req, res) => {
    const surveys = await Questionnaire.findAll({
        where: {published: true},
        attributes: ['id', 'title', 'about'],
        include: [
            {
                model: Administrator,
                attributes: ['corporation']
            },
            {
                model: Keyword,
                attributes: ['title']
            }
        ]
    });

    return res.status(200).json(surveys);
}

exports.getSurvey = (req, res) => {}

exports.getQuestion = (req, res) => {}

exports.postAnswer = (req, res) => {}

exports.getSessionAnswers = (req, res) => {}

exports.getAnswers = (req, res) => {}