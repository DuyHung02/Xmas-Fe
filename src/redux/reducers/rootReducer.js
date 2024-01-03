import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import profileReducer from '../slices/profile.slice';
import messageReducer from '../slices/message.slice'

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  message: messageReducer,
});

export default rootReducer;
