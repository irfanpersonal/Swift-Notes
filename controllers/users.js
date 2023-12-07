const {StatusCodes} = require('http-status-codes');
const User = require('../models/User.js');
const {createJWT, attachCookieToResponse} = require('../utils/index.js');
const CustomError = require('../errors');

const showCurrentUser = async(req, res) => {
    return res.status(StatusCodes.OK).json({user: req.user});
}

const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {email: req.user.email},
        attributes: {exclude: ['password']}
    });
    const {name, email} = req.body;
    if (name) {
        user.name = name;
    }
    if (email) {
        user.email = email;
    }
    await user.save();
    const token = createJWT(user);
    attachCookieToResponse(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user.id,
        name: user.name,
        email: user.email
    }});
}

const updateUserPassword = async(req, res) => {
    const {oldPassword, newPassword} = req.body;
    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('Please provide oldPassword and newPassword!');
    }
    const user = await User.findOne({
        where: {email: req.user.email}
    });
    const isCorrect = await user.comparePassword(oldPassword);
    if (!isCorrect) {
        throw new CustomError.BadRequestError('Incorrect Old Password!');
    }
    user.password = newPassword;
    await user.save();
    const token = createJWT(user);
    attachCookieToResponse(res, token);
    return res.status(StatusCodes.OK).json({user: {
        userID: user.id,
        name: user.name,
        email: user.email
    }});
}

module.exports = {
    showCurrentUser,
    updateUser,
    updateUserPassword
};

// You can always use the .query method attached to the Sequelize instance to do
// some complex query. For example
// let sql = 'SELECT * FROM users WHERE name = 'john'
// await sequelize.query(sql);
// So don't think your limited to only using the features provided by the ORM 
// you can always falls back on using regular old SQL transactions. 
