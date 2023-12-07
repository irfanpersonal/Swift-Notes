import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    note: null
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        setNote: (state, action) => {
            state.note = action.payload;
        }
    },
    extraReducers: (builder) => {
        
    }
});

export const {setNote} = noteSlice.actions;

export default noteSlice.reducer;