const jwt = require('jsonwebtoken');
const { Token, User } = require('../utilities/database');

module.exports = (req, res, next) => {
    const token = req.header('X-OBSERVATORY-AUTH');

    if(!token) return res.status(401).json({message: 'no token'});

    jwt.verify(token, 'secret', (err, user) => {
        if(err) {
            Token.findOne({where: {token}}).then(async myToken => {
                if(myToken) {
                    await myToken.destroy();
                }
            }).catch(err => {
                console.error(err);
                return res.status(500).json(err);
            })
            return res.status(401).json({message: 'invalid token'});
        } else {
            Token.findOne({where: {token}}).then(myToken => {
                if(myToken) {
                    //if(!user) throw {message: 'invalid user'}
                    req.user = user;
                    req.role = myToken.role;
                    next();
                } else {
                    res.status(401).json({message: 'token destroyed'});
                }
            }).catch(err => {
                console.error(err);
                return res.status(500).json(err);
            })
        }
    })
}