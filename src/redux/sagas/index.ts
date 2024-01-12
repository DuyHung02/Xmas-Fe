import profileSaga from './profile.saga';
import { fork } from 'redux-saga/effects';
import productSaga from './product.saga';
import messageSaga from './message.saga';
import friendSaga from './friend.saga';

const rootSaga = function* () {
  yield fork(profileSaga);
  yield fork(productSaga);
  yield fork(messageSaga);
  yield fork(friendSaga);
};

export default rootSaga;
