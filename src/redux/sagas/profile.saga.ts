import { call, put, takeLatest } from 'redux-saga/effects';
import { profileAction } from '../slices/profile.slice';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { axiosInstance } from '../../services/axios.service.js';

const fetchProfiles = async () => {
  return axiosInstance.get(`/profiles`);
};

const fetchProfileByUserId = async userId => {
  return axiosInstance.get(`/user/profile/${userId}`);
};

const createProfile = async payload => {
  const profile = {
    userId: payload.userId,
    email: payload?.email,
    avatar: payload?.avatar,
    gender: payload?.gender,
    firstName: payload?.firstName,
    lastName: payload?.lastName,
  };
  return axiosInstance.post('/profiles', profile);
};
const updateProfile = async payload => {
  return axiosInstance.put(`/profiles/${payload.id}`, payload);
};

const handleFetchProfile = function* (action) {
  try {
    yield put({
      type: profileAction.fetchProfilePending.type,
    });
    const response = yield call(() => fetchProfileByUserId(action.payload));
    const profile = response.data.data;
    yield put({
      type: profileAction.fetchProfileSuccess.type,
      payload: profile,
    });
  } catch (e) {
    yield put({
      type: profileAction.fetchProfileError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleCreateProfile = function* (action) {
  try {
    yield put({
      type: profileAction.createProfilePending.type,
    });
    yield call(createProfile, action.payload);
    yield put({
      type: profileAction.createProfileSuccess.type,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: profileAction.createProfileError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const handleUpdateProfile = function* (action) {
  try {
    yield put({
      type: profileAction.updateProfilePending.type,
    });
    yield call(updateProfile, action.payload);
    yield put({
      type: profileAction.updateProfileSuccess.type,
      payload: action.payload,
    });
  } catch (e) {
    yield put({
      type: profileAction.updateProfileError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const profileSaga = function* () {
  yield takeLatest(
    `${profileAction.fetchProfilePending}_saga`,
    handleFetchProfile,
  );
  yield takeLatest(
    `${profileAction.createProfilePending}_saga`,
    handleCreateProfile,
  );
  yield takeLatest(
    `${profileAction.updateProfilePending}_saga`,
    handleUpdateProfile,
  );
};

export default profileSaga;
