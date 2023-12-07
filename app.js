require('express-async-errors');
require('dotenv').config();
const {connectDB} = require('./database/connect.js');
const authenticationMiddleware = require('./middleware/authentication.js');
const usersRouter = require('./routers/users.js');
const notesRouter = require('./routers/notes.js');
const authRouter = require('./routers/auth.js');
const errorHandlerMiddleware = require('./middleware/error-handler.js');
const notFoundMiddleware = require('./middleware/not-found.js');
const express = require('express');
const app = express();

const path = require('node:path');

const cookieParser = require('cookie-parser');

app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.json());

app.use(express.static(path.resolve(__dirname, './client/build')));

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/notes', authenticationMiddleware, notesRouter);

app.use('/api/v1/users', authenticationMiddleware, usersRouter);

app.get('*', (req, res) => {
	return res.status(200).sendFile(path.resolve(__dirname, './client/build/index.html'));
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3306;
const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server listening on port ${port}...`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();