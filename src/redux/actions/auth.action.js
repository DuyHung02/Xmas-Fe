import { axiosInstance } from '../../services/axios.service';
import { toast } from 'react-toastify';
import { profileAction } from '../slices/profile.slice';

export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT_PENDING = 'LOGOUT_PENDING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const REGISTER_PENDING = 'REGISTER_PENDING';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const CHANGE_PASSWORD_PENDING = 'CHANGE_PASSWORD_PENDING';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL';

export const login = payload => async dispatch => {
  try {
    dispatch({ type: LOGIN_PENDING });
    const response = await axiosInstance.post('/user/login', payload);
    const user = response.data;
    if (user) {
      dispatch({
        type: `${profileAction.fetchProfilePending}_saga`,
        payload: user.userId,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: { ...user } });
      toast.success(`Welcome back, ${user.username}`);
    } else {
      toast.error('Username or password invalid');
    }
  } catch (e) {
    dispatch({ type: LOGIN_FAIL, message: e?.message });
    toast.error(e?.message || 'Server Error');
  }
};

export const register = payload => async dispatch => {
  try {
    dispatch({ type: REGISTER_PENDING });
    const user = {
      username: payload.username,
      password: payload.password,
      token: 'Token TEST',
      isAdmin: false,
    };
    const response = await axiosInstance.post('/users', user);
    if (response.status === 201) {
      const userData = response.data;
      const profile = {
        userId: userData.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        avatar:
          'https://i.pinimg.com/564x/03/64/f0/0364f0a472a97ae84c36682b56d31d87.jpg',
      };
      dispatch({
        type: `${profileAction.createProfilePending}_saga`,
        payload: profile,
      });
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { ...userData },
      });
      toast.success(`Welcome to my web!`);
    }
  } catch (e) {
    dispatch({ type: REGISTER_FAIL, message: e?.message });
    toast.error(e?.message || 'Server Error');
  }
};

export const changePassword = payload => async dispatch => {
  try {
    dispatch({ type: CHANGE_PASSWORD_PENDING });
    const response = await axiosInstance.get(`/users/${payload.userId}`);
    const user = response.data;
    user.password = payload.password;
    await axiosInstance.put(`/users/${payload.userId}`, user);
    dispatch({ type: CHANGE_PASSWORD_SUCCESS });
    toast.success(`Change password successfully!`);
  } catch (e) {
    dispatch({ type: CHANGE_PASSWORD_FAIL, message: e?.message });
    toast.error(e?.message || 'Server Error');
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_SUCCESS });
};
