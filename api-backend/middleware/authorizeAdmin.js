const { isAdmin } = require("../utilities/roles")

module.exports = (req, res, next) => {
    if(isAdmin(req)) 
        next();
    else 
        res.status(401).json({message: 'not authorized'})
}