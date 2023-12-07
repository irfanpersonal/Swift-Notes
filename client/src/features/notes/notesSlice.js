import {createSlice} from "@reduxjs/toolkit";
import {getAllNotes} from "./notesThunk";

const initialState = {
    isLoading: true,
    notes: []
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getAllNotes.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllNotes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notes = action.payload;
        }).addCase(getAllNotes.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});

export const {} = notesSlice.actions;

export default notesSlice.reducer;