const { isUser } = require("../utilities/roles")

module.exports = (req, res, next) => {
    if(isUser(req))
        next();
    else
        res.status(401).json({message: 'you must be logged in to do that'});
}