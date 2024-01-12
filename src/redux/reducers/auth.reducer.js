import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_PENDING,
  LOGOUT_FAIL,
  REGISTER_PENDING,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  CHANGE_PASSWORD_PENDING,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_SUCCESS,
} from '../actions/auth.action';

const initState = {
  username: '',
  token: '',
  isAdmin: false,
  userId: null,
  userInfo: {},
  isLoading: false,
  message: '',
};

const authReducer = (state = initState, action) => {
  const authData = action.payload;
  let userInfo;
  switch (action.type) {
    case LOGIN_PENDING:
    case LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true,
        message: '',
      };
    case REGISTER_PENDING:
    case CHANGE_PASSWORD_PENDING:
      return {
        ...state,
        isLoading: true,
        message: '',
      };
    case LOGIN_FAIL:
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    case REGISTER_FAIL:
    case CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        message: action.message,
      };
    case LOGIN_SUCCESS:
      userInfo = {
        userId: authData.userId,
        isAdmin: authData.isAdmin,
      };
      return {
        ...state,
        userInfo,
        username: authData.username,
        token: authData.token,
        isAdmin: authData.isAdmin,
        userId: authData.userId,
        isLoading: false,
        message: '',
      };
    case LOGOUT_SUCCESS:
      localStorage.clear();
      return initState;
    case REGISTER_SUCCESS:
      userInfo = {
        userId: authData.id,
        isAdmin: authData.isAdmin,
      };
      return {
        ...state,
        userInfo,
        username: authData.username,
        token: authData.token,
        isAdmin: authData.isAdmin,
        userId: authData.id,
        isLoading: false,
        message: '',
      };
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: '',
      };
    default:
      return state;
  }
};

export default authReducer;
