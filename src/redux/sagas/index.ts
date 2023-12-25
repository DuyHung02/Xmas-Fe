import profileSaga from './profile.saga';
import { fork } from 'redux-saga/effects';
import productSaga from "./product.saga";

const rootSaga = function* () {
    yield fork(profileSaga);
    yield fork(productSaga);
};

export default rootSaga;