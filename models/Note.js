const Sequelize = require('sequelize');
const {sequelize} = require('../database/connect.js');
const User = require('./User.js');

const Note = sequelize.define('notes', {
    name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAtleastOneCharacter: (value) => {
                if (value.length < 1) {
                    throw new Error('isAtleastOneCharacter: false');
                }
            }
        }
    },
    content: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
            isAtleastOneCharacter: (value) => {
                if (value.length < 1) {
                    throw new Error('isAtleastOneCharacter: false');
                }
            }
        }
    },
    user_id: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isAValidValue: (value) => {
                if (!value) {
                    throw new Error('isAValidValue: false');
                }
            }
        }
    }
}, {timestamps: true, freezeTableName: true});

Note.belongsTo(User, {foreignKey: 'user_id'}); // This is basically saying, "hey we would
// like to make an association also known as a reference in Mongoose". So thats what 
// Note.belongsTo() means. Now the first argument is the table we are setting a 
// reference to, and the second is an object where you pass in the property of 
// foreign key set to the column in the current table that is being referenced.

// Now to create the populating effect we usually do in Mongoose we simply have to
// use the include property where it is set to the column we would like to invoke 
// the reference for. In our case that would be user so it would look like this.
// const note = await Note.findAll({where: {user: req.user.userID}}, {include: 'user'});

async function syncTable() {
    await Note.sync();
    console.log(`Note Table Created if it doesn't exist. And doing nothing if it already exists.`);
}

syncTable();

module.exports = Note;