import {createSlice} from "@reduxjs/toolkit";
import {IProduct} from "../types/product";

type IInitialState = {
    products: IProduct[],
    isLoading: boolean;
    isError: boolean;
    message: string;
}

const initialState: IInitialState = {
    products: [],
    isLoading: false,
    isError: false,
    message: '',
}

const requestPending = (state: IInitialState) => {
    state.isLoading = true;
    state.isError = false;
    state.message = '';
};

const requestError = (
    state: IInitialState,
    action: { type: string; payload: { message: string } },
) => {
    state.isLoading = false;
    state.isError = true;
    state.message = action.payload.message;
};

const fetchProductsPending = requestPending;
const fetchProductsError = requestError;

const fetchProductsSuccess = (
    state: IInitialState,
    action: {
        type: string;
        payload: IProduct[],
    }
) => {
    state.products = action.payload
}

const managerProductSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        fetchProductsPending,
        fetchProductsError,
        fetchProductsSuccess,
    },
});

export default managerProductSlice.reducer;
export const managerProductActions = managerProductSlice.actions;