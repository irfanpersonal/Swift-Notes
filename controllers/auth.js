const {StatusCodes} = require('http-status-codes');
const {createJWT, attachCookieToResponse} = require('../utils');
const User = require('../models/User.js'); // We load in the User model so we can utilize methods like create which will add a row into the table and other useful methods.
const CustomError = require('../errors');

const register = async(req, res) => {
    const user = await User.create(req.body);
    const token = createJWT(user);
    attachCookieToResponse(res, token);
    return res.status(StatusCodes.CREATED).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide both email and password!');
    }
    const user = await User.findOne({where: {email}});
    if (!user) {
        throw new CustomError.BadRequestError('No User Found with the Email Provided!');
    }
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
        throw new CustomError.UnauthorizedError('Invalid Password!');
    }
    const token = createJWT(user);
    attachCookieToResponse(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user._id,
        name: user.name,
        email: user.email
    }});
}

const logout = async(req, res) => {
    res.clearCookie('token');
    return res.status(StatusCodes.OK).json({msg: 'Successfully Logged Out!'});
}

module.exports = {
    register,
    login,
    logout
};