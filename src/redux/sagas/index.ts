import profileSaga from './profile.saga';
import { fork } from 'redux-saga/effects';
import productSaga from "./product.saga";
import messageSaga from "./message.saga";

const rootSaga = function* () {
    yield fork(profileSaga);
    yield fork(productSaga);
    yield fork(messageSaga);
};

export default rootSaga;