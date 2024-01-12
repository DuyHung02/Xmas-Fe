import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import profileReducer from '../slices/profile.slice';
import messageReducer from '../slices/message.slice';
import managerFriendReducer from '../slices/managerFriend.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  message: messageReducer,
  friend: managerFriendReducer,
});

export default rootReducer;
