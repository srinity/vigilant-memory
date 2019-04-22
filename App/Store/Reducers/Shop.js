import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    isLoading: false,
    products: null,
    displayProduct: null,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.GET_SHOP_PRODUCTS_REQUEST_STARTED:
            return { ...state, isLoading: true };

        case ActionTypes.GET_SHOP_PRODUCTS_REQUEST_SUCCESS:
            return { ...state, isLoading: false, products: action.products };

        case ActionTypes.GET_SHOP_PRODUCTS_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

        case ActionTypes.GET_SHOP_CATEGORY_PRODUCTS:
            return { ...state, displayProduct: action.products };

        default: 
            return state;
    }
}
