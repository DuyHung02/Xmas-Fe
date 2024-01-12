import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../types/user';

type IInitialState = {
  friends: IUser[];
  isLoading: boolean;
  isError: boolean;
  message: string;
};

const initialState: IInitialState = {
  friends: [],
  isLoading: false,
  isError: false,
  message: '',
};

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

const fetchListFriendsPending = requestPending;
const fetchListFriendsError = requestError;

const fetchListFriendSuccess = (
  state: IInitialState,
  action: {
    type: string;
    payload: IUser[];
  },
) => {
  state.friends = action.payload;
  state.isLoading = false;
};

const managerFriendSlice = createSlice({
  name: 'friend',
  initialState,
  reducers: {
    fetchListFriendsPending,
    fetchListFriendsError,
    fetchListFriendSuccess,
  },
});

export default managerFriendSlice.reducer;
export const managerFriendAction = managerFriendSlice.actions;
