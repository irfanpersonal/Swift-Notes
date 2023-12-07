const {StatusCodes} = require('http-status-codes');
const Note = require('../models/Note.js');
const CustomError = require('../errors');

const getAllNotes = async(req, res) => {
    const notes = await Note.findAll({where: {user_id: req.user.userID}});
    return res.status(StatusCodes.OK).json({notes, count: notes.length});
}

const createNote = async(req, res) => {
    req.body.user_id = req.user.userID;
    const note = await Note.create(req.body);
    return res.status(StatusCodes.CREATED).json({note});
}

const getSingleNote = async(req, res) => {
    const {id} = req.params;
    const note = await Note.findOne({where: {user_id: req.user.userID, id: id}});
    if (!note) {
        throw new CustomError.NotFoundError('No Note Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).json({note});
}

const updateSingleNote = async(req, res) => {
    const {id} = req.params;
    const note = await Note.findOne({where: {user_id: req.user.userID, id: id}});
    if (!note) {
        throw new CustomError.NotFoundError('No Note Found with the ID Provided!');
    }
    const {name, content} = req.body;
    if (name) {
        note.name = name;
    }
    if (content) {
        note.content = content;
    }
    await note.save();
    return res.status(StatusCodes.OK).json({note});
}

const deleteSingleNote = async(req, res) => {
    const {id} = req.params;
    const note = await Note.destroy({where: {user_id: req.user.userID, id: id}});
    if (!note) {
        throw new CustomError.NotFoundError('No Note Found with the ID Provided!');
    }
    return res.status(StatusCodes.OK).json({msg: 'Deleted Single Note!'});
}

module.exports = {
    getAllNotes,
    createNote,
    getSingleNote,
    updateSingleNote,
    deleteSingleNote
};