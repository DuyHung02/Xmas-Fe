import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import profileReducer from '../slices/profile.slice.ts';

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;
