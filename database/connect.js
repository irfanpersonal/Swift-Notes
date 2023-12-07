// In order to get started using Sequelize we first have to install it and the 
// database we want to use for our project. Because we are using mysql we can
// make use of the mysql2 third party module. So together it would look like this
// npm insall sequelize mysql2 --save
// Once installed we want to load in both of them.
const Sequelize = require('sequelize'); // This returns a class declaration
const mysql = require('mysql2/promise'); // Unlike the mysql package which is callback
// approached, mysql2/promise is promise approached. It is much easier to use.
// Notice how we don't use the mysql2 third party module anywhere in our project
// I am simply loading it in to tell you that the reason why we installed this is because
// internally under the hood sequelize uses it. So although you don't see its importance
// explicitly just know under the hood it is being used!

// Here we make an instance of class Sequelize which we imported earlier. This class
// constructor takes in 4 arguments. Where the first one is the database name, the 
// user of the server, the password for the user of the server, and an object that 
// takes in a configuration object where we add some settings. We add the setting
// dialect inside to tell sequelize that the database we are using is mysql. And if
// we use another one we just write it in like postgres.
const sequelize = new Sequelize('SWIFT_NOTES', 'root', process.env.MYSQL_DATABASE_PASSWORD, {
    dialect: 'mysql',
    pool: {
        idle: Infinity
    }
});
// Notice how we added this property called pool and set it to a key/value pair where
// idle is equal to infintiy. By default the connection will be closed by 10 seconds
// of inactivity. So by setting it to Infinity we make it so that we will maintain the
// connection for as long as we want until we disconnect. If I leave out the pool property
// entirely and no longer have the idle property set I will encounter a 
// SequelizeConnectionError. So always make sure to set idle to Infinity. This way 
// you don't have to spam requests to make sure you don't run out on idle time.

const connectDB = () => {
    return sequelize.authenticate(); // This will connect to the database
}

module.exports = {connectDB, sequelize}; // We are exporting connectDB so that we 
// can connect to our database from app.js. We are exporting the instance of Sequelize
// so that we can use it to define our columns type and not have to create this instance
// all over the place and keep rewriting a ton of code.

/*
    How to fix SequelizeConnectionError in Sequelize (SERN) Application?

    // Error 

    "msg": "connect ETIMEDOUT"

    {
        "err": {
            "name": "SequelizeConnectionError",
            "parent": {
                "errorno": "ETIMEDOUT",
                "code": "ETIMEDOUT",
                "syscall": "connect",
                "fatal": true
            },
            "original": {
                "errorno": "ETIMEDOUT",
                "code": "ETIMEDOUT",
                "syscall": "connect",
                "fatal": true
            }
        }
    }

    // Error
    
    The reason why you are getting this error is because by default Sequeilze 
    disconnects from the database upon 10 seconds of inactivity. Meaning if you’re 
    not constantly spamming requests you will be disconnected. So to fix this 
    simply go to your Sequelize instance and pass in a property of pool with a 
    key value pair for “idle”. Where “idle” is set to “Infinity” so you don’t have 
    to worry about SequelizeConnectionError. So like this. 
    
    const sequelize = new Sequelize('SWIFT_NOTES', 'root', process.env.MYSQL_DATABASE_PASSWORD, {
    dialect: 'mysql',
    pool: {
        idle: Infinity 
    }
});
*/

/*
    What does the error “Too many keys specified; max 64 keys allowed” mean in my Sequelize?
    
    This error is related to the number of keys (indexes or constraints) defined 
    in your database, not necessarily the number of rows in the table. Each time 
    you define a unique constraint using unique: true in Sequelize, it corresponds 
    to the creation of an index in the database. The reason why this issue is 
    happening is because you set the alter property to true inside of the model.sync 
    async method. And when you do that it will keep adding keys. So just remove it 
    and you should be good to go. 
    
    So this is wrong
    
    await User.sync({alter: true});
    
    And this is good
    
    await User.sync();

    Using the alter or force property is destructive. Stick to empty sync and your
    good!
*/
