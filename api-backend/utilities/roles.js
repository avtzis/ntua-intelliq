function isAdmin(req) {
    return req.role === 'admin';
}

function isUser(req) {
    return isAdmin || req.role === 'user';
}

module.exports = {
    isAdmin,
    isUser
}