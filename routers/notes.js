const express = require('express');
const router = express.Router();

const {getAllNotes, createNote, getSingleNote, updateSingleNote, deleteSingleNote} = require('../controllers/notes');

router.route('/').get(getAllNotes).post(createNote);
router.route('/:id').get(getSingleNote).patch(updateSingleNote).delete(deleteSingleNote);

module.exports = router;