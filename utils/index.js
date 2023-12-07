const jwt = require('jsonwebtoken');

const createJWT = (user) => {
    return jwt.sign(
        {userID: user.id, name: user.name, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    );
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const attachCookieToResponse = (res, token) => {
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    });
}

module.exports = {
    createJWT,
    verifyToken,
    attachCookieToResponse
};