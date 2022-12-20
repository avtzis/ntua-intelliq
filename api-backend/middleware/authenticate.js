const jwt = require('jsonwebtoken');
const { Token } = require('../utilities/database');

module.exports = (req, res, next) => {
    const token = req.header('X-OBSERVATORY-AUTH');

    if(!token) return res.status(401).json({message: 'no token'});

    jwt.verify(token, 'secret', (err, user) => {
        if(err) res.status(403).json({authenticate: {message: 'invalid token'}});
        else {
            Token.findOne({where: {token}}).then(myToken => {
                if(myToken) {
                    req.user = user;
                    req.role = myToken.role;
                    next();
                }
                else {
                    res.status(403).json({authenticate: {message: 'token destroyed'}});
                }
            })
        }
    })
}