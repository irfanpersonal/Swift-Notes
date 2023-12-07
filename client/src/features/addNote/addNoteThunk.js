import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const createNote = createAsyncThunk('addNote/createNote', async(note, thunkAPI) => {
    try {
        const response = await axios.post('/api/v1/notes', note);
        const data = response.data;
        return data.note;
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getSingleNote = createAsyncThunk('addNote/getSingleNote', async(noteID, thunkAPI) => {
    try {
        const response = await axios.get(`/api/v1/notes/${noteID}`);
        const data = response.data;
        return data.note;
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const editSingleNote = createAsyncThunk('addNote/editSingleNote', async({noteID, note}, thunkAPI) => {
    try {
        const response = await axios.patch(`/api/v1/notes/${noteID}`, note);
        const data = response.data;
        return data.note;
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const deleteSingleNote = createAsyncThunk('addNote/deleteSingleNote', async(noteID, thunkAPI) => {
    try {
        const response = await axios.delete(`/api/v1/notes/${noteID}`);
        const data = response.data;
        return data;
    } 
    catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});