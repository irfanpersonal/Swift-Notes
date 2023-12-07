import {createSlice} from "@reduxjs/toolkit";
import {createNote, deleteSingleNote, editSingleNote, getSingleNote} from "./addNoteThunk.js";
import {toast} from 'react-toastify';

const initialState = {
    isEditing: false,
    isLoading: false,
    singleNoteData: {
        name: '',
        content: '',
        id: ''
    },
    isLoadingSingleNoteData: false
};

const addNoteSlice = createSlice({
    name: 'addNote',
    initialState,
    reducers: {
        isEditingTrue: (state, action) => {
            state.isEditing = true;
        },
        isEditingFalse: (state, action) => {
            state.isEditing = false;
        },
        updateSingleNoteData: (state, action) => {
            state.singleNoteData[action.payload.name] = action.payload.value;
        },
        resetSingleNoteData: (state, action) => {
            state.singleNoteData = {
                name: '',
                content: '',
                id: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createNote.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(createNote.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Created Note!');
        }).addCase(createNote.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(getSingleNote.pending, (state, action) => {
            state.isLoadingSingleNoteData = true;
        }).addCase(getSingleNote.fulfilled, (state, action) => {
            state.isLoadingSingleNoteData = false;
            state.singleNoteData = action.payload;
        }).addCase(getSingleNote.rejected, (state, action) => {
            state.isLoadingSingleNoteData = false;
        }).addCase(editSingleNote.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(editSingleNote.fulfilled, (state, action) => {
            state.isLoading = false;
            toast.success('Edited Note!');
        }).addCase(editSingleNote.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(deleteSingleNote.fulfilled, (state, action) => {
            toast.success('Deleted Note!');
        }).addCase(deleteSingleNote.rejected, (state, action) => {
            toast.error(action.payload);
        });
    }
});

export const {isEditingTrue, isEditingFalse, updateSingleNoteData, resetSingleNoteData} = addNoteSlice.actions;

export default addNoteSlice.reducer;