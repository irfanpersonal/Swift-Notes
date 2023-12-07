const Sequelize = require('sequelize'); // We load in sequelize so we can utilze the DataTypes property inside of it for the column values.
const {sequelize} = require('../database/connect.js'); // We load in the instance of sequelize so we don't have to create a bunch of instances for no reason.
const validator = require('validator');
const bcrypt = require('bcryptjs');

// In order to create a Table in our database also known as a Collection in Mongoose 
// we have to use the define method attached to the sequelize instance. The define 
// method takes in three arguments. Where the first parameter is equal to the Table 
// name, the second parameter is an object that represents the different columns
// of the table. And the third is in options object where we can add things like
// timestamps, freezeTableName, and hooks. Where timestamps will add the createdAt and updatedAt
// columns for us. And setting freezeTableName to true will make it so that whatever 
// you pass into the first argument of the define method will be the exact VERBATIM 
// name for the table. hooks is equal an object which contains key/value pairs for 
// things like "beforeCreate" and its equal to a function. And it gets access in its
// parameter the current row. 
const User = sequelize.define('users', {
    // Inside of this object we can pass in key/value pairs. Where the key is
    // equal to the column for the table and the value is equal to an object
    // which is equal to the column values. In the column value object you
    // can pass in things like the type. Where you specify whether that column
    // is equal to a string, integer, or any other types. We can also pass in
    // allowNull where when its set to false, it makes it so that column cannot 
    // be null. So if you pass in an empty string '' or a string with the value 'null'
    // or 'NULL' it will work. Its only when you pass in NULL that you get an error.
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAtleast3Characters: (value) => {
                if (value.length < 3) {
                    throw new Error('isAtleast3Characters: false');
                }
            }
        }
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isAtleast3Characters: (value) => {
                if (value.length < 3) {
                    throw new Error('isAtleast3Characters: false');
                }
            },
            isValidEmail: (value) => {
                if (!validator.isEmail(value)) {
                    throw new Error('isValidEmail: false');
                }
            }
        }
    },
    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAtleast5Characters: (value) => {
                if (value.length < 5) {
                    // If you throw a error inside of a validate then it will pop up in the SequelizeValidationError
                    throw new Error('isAtleast5Characters: false');
                }
            }
        }
    }
}, {timestamps: true, freezeTableName: true, hooks: {
    // This "beforeSave" is called a hook. This is a way for us to execute
    // some logic before we save a user. The beautiful thing about this hook
    // is that it will execute for when you use the .create and the .save method
    // unlike the "beforeCreate" which only does for the .create method. It also 
    // has access to the row data and you can do whatever logic you want.
    beforeSave: async(user) => {
        if (user.changed('password')) {
            const randomBytes = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, randomBytes);
        }
    }
}});

// We can now access the comparePassword method on the User instance
User.prototype.comparePassword = async function(guess) {
    // "this" is a reference to the row data. 
    const isCorrect = await bcrypt.compare(guess, this.password);
    return isCorrect;
}

async function syncTable() {
    // The sync method attached to the User model is an async method that upon 
    // invoction will create the table if it doesn't exist and do nothing if it
    // already exists. However we can change this functionality of it not doing
    // anything if the table already exists by passing in an object with one of 
    // the two properties. We can use force and set it to true which makes it so
    // that it will delete the table if it already exists and recreate it. And 
    // then we have the alter property that when set to true would update the table
    // if it detects any changes. So your kept up to date.
    await User.sync();
    console.log(`User Table Created if it doesn't exist. And doing nothing if it already exists.`);
}

syncTable();

module.exports = User; // We are exporting the Table so that we can use the methods on it to do things like create a User into our table and other things.

/*
    Useful Sequelize Validators
    
    allowNull: false
    This makes it so that if you set an empty value for the column you will get a 
    ValidationError
    
    unique: true
    This will make it so that the column must be unique. So if you enter a duplicate 
    of something that is already in that table for example a duplicate email it will 
    throw a SequelizeUniqueConstraintError
    
    validate: {
        someFunctionThatWillBeExecuted: (value entered for column) {
            if (some logic) {
                throw new Error(‘Set to whatever’);
            }
        }
    }
    This will execute all the functions you place inside of validate and if it’s an 
    error it will return a SequelizeValidationError.

    An example of validate in action

    validate: {
        isAtleast3Characters: (value) => {
            if (value.length < 3) {
                throw new Error('isAtleast3Characters: false');
            }
        }
    }
*/