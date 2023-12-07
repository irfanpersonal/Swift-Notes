import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice.js';
import notesReducer from './features/notes/notesSlice.js';
import noteReducer from './features/note/noteSlice.js';
import addNoteReducer from './features/addNote/addNoteSlice.js';

const store = configureStore({
    reducer: {
        user: userReducer,
        notes: notesReducer,
        note: noteReducer,
        addNote: addNoteReducer
    }
});

export default store;