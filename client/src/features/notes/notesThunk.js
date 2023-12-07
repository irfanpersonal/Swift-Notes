import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';

export const getAllNotes = createAsyncThunk('notes/getAllNotes', async(_, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/notes');
        const data = response.data;
        return data.notes;
    }
    catch(error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});