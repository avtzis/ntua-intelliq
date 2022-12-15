function isAdmin(req) {
    return req.role === 'admin';
}

function isResearcher(req) {
    return isAdmin || req.role === 'researcher';
}

function isUser(req) {
    return isAdmin || isResearcher || req.role === 'user';
}

module.exports = {
    isAdmin,
    isResearcher,
    isUser
}