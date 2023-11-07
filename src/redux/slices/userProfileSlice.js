
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

const initialState = {
    userId: null,
    fullname: '',
    birthdate: '',
    email: '',
    phone_number: '',
    cccd: '',
    address: '',
    avatarUrl: '',
};

export const fetchMyProfile = createAsyncThunk('userProfile/fetchMyProfile', async () => {
    const response = await userService.getMYProfile();
    const userProfile = {
        ...response,
        fullname: response.fullname || '',
        birthdate: response.birthdate || '',
        email: response.email || '',
        phone_number: response.phone_number || '',
        cccd: response.cccd || '',
        address: response.address || '',
        avatarUrl: response.avatarUrl || '',
    };
    return userProfile;
});

const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        updateProfile: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyProfile.fulfilled, (state, action) => {
                return action.payload;
            });
    },
});
export const { updateProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
