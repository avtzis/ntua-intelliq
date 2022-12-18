const { isResearcher } = require("../utilities/roles")

module.exports = (req, res, next) => {
    if(isResearcher(req))
        next();
    else 
        res.status(401).json({message: 'not authorized'});
}