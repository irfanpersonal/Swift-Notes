const {StatusCodes} = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong, try again later!'
    };
    // Validation Error
    if (err.name === 'SequelizeValidationError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = 'Please check all inputs!';
    }
    // Duplicate Name/Email Error
    if (err.name === 'SequelizeUniqueConstraintError') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = 'Someone already took the name/email provided!';
    }
    // Too long input (for example above 255 limit)
    if (err?.parent?.code === 'ER_DATA_TOO_LONG') {
        customError.statusCode = StatusCodes.BAD_REQUEST;
        customError.msg = 'Maximum of 255 characters allowed for inputs!';
    }
    return res.status(customError.statusCode).json({msg: customError.msg});
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
}

module.exports = errorHandler;