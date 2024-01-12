import { call, put, takeLatest } from 'redux-saga/effects';
import { managerFriendAction } from '../slices/managerFriend.slice';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { axiosInstance } from '../../services/axios.service';

const fetchListFriends = async () => {
  return axiosInstance.get('/user/list');
};

const handleFetchFriends = function* () {
  try {
    yield put({
      type: managerFriendAction.fetchListFriendsPending.type,
    });
    const response = yield call(fetchListFriends);
    const listFriends = response.data.data;
    yield put({
      type: managerFriendAction.fetchListFriendSuccess.type,
      payload: listFriends,
    });
  } catch (e) {
    yield put({
      type: managerFriendAction.fetchListFriendsError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};

const friendSaga = function* () {
  yield takeLatest(
    `${managerFriendAction.fetchListFriendsPending}_saga`,
    handleFetchFriends,
  );
};

export default friendSaga;
