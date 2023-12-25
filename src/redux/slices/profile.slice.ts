import {createSlice} from "@reduxjs/toolkit";
import {IProfile} from "../types/profile";

type IInitialState = {
    profile: IProfile;
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    profile: {},
    isLoading: false,
    isError: false,
    message: '',
}

const requestPending = (state: IInitialState) => {
    state.isLoading = true;
    state.isError = false;
    state.message = '';
};

const requestError = (
    state: IInitialState,
    action: { type: string; payload: { message: string } },
) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload.message;
};

const fetchProfilePending = requestPending;
const fetchProfileError = requestError;
const createProfilePending = requestPending;
const createProfileError = requestError;
const updateProfilePending = requestPending;
const updateProfileError = requestError;

const fetchProfileSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IProfile
    }
) => {
    state.profile = action.payload
}

const createProfileSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IProfile
    }
) => {
    state.profile = action.payload
}

const updateProfileSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IProfile;
    }
) => {
    const profile = action.payload
    state.isLoading = false;
    state.profile = {
        ...state.profile,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
    }
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        fetchProfilePending,
        fetchProfileError,
        fetchProfileSuccess,
        createProfilePending,
        createProfileError,
        createProfileSuccess,
        updateProfilePending,
        updateProfileError,
        updateProfileSuccess,
    }
});

export default profileSlice.reducer;

export const profileAction = profileSlice.actions;