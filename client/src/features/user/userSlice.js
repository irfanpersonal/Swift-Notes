import {createSlice} from '@reduxjs/toolkit';
import {registerUser, loginUser, showCurrentUser, logoutUser, updateUser, updateUserPassword} from './userThunk';
import {toast} from 'react-toastify';

const initialState = {
    isLoading: true,
    user: null,
    wantsToRegister: true,
    isSubmitting: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        toggleAuthType: (state, action) => {
            state.wantsToRegister = !state.wantsToRegister;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isSubmitting = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isSubmitting = false;
            state.user = action.payload;
            toast.success('Successfully Registered User!');
        }).addCase(registerUser.rejected, (state, action) => {
            state.isSubmitting = false;
            toast.error(action.payload);
        }).addCase(showCurrentUser.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(showCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        }).addCase(showCurrentUser.rejected, (state, action) => {
            state.isLoading = false;
        }).addCase(loginUser.pending, (state, action) => {
            state.isSubmitting = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isSubmitting = false;
            state.user = action.payload;
            toast.success('Successfully Logged In!');
        }).addCase(loginUser.rejected, (state, action) => {
            state.isSubmitting = false;
            toast.error(action.payload);
        }).addCase(logoutUser.fulfilled, (state, action) => {
            state.user = null;
        }).addCase(updateUser.pending, (state, action) => {
            state.isSubmitting = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            state.isSubmitting = false;
            state.user = action.payload;
            toast.success('Updated User!');
        }).addCase(updateUser.rejected, (state, action) => {
            state.isSubmitting = false;
            toast.error(action.payload);
        }).addCase(updateUserPassword.pending, (state, action) => {
            state.isSubmitting = true;
        }).addCase(updateUserPassword.fulfilled, (state, action) => {
            state.isSubmitting = false;
            state.user = action.payload;
            toast.success('Updated User Password!');
        }).addCase(updateUserPassword.rejected, (state, action) => {
            state.isSubmitting = false;
            toast.error(action.payload);
        });
    }
});

export const {toggleAuthType} = userSlice.actions;

export default userSlice.reducer;