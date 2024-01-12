import { call, put, takeLatest } from 'redux-saga/effects';
import { axiosInstance } from '../../services/axios.service';
import { managerProductActions } from '../slices/managerProduct.slice';
import { toast } from 'react-toastify';
import { get } from 'lodash';

const fetchProducts = async () => {
  return axiosInstance.get('/products');
};

const handleFetchProducts = function* () {
  try {
    yield put({
      type: managerProductActions.fetchProductsPending.type,
    });
    const response = yield call(fetchProducts);
    if (response.status === 200) {
      const products = response.data;
      console.log(products);
      yield put({
        type: managerProductActions.fetchProductsSuccess.type,
        payload: products,
      });
    }
  } catch (e) {
    yield put({
      type: managerProductActions.fetchProductsError.type,
      payload: { message: get(e, 'message') },
    });
    toast.error(get(e, 'message'));
  }
};
const productSaga = function* () {
  yield takeLatest(
    `${managerProductActions.fetchProductsPending}_saga`,
    handleFetchProducts,
  );
};

export default productSaga;
