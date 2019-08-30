import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    areProductsLoading: false,
    areExtraProductsLoading: false,
    noMoreProducts: false,
    products: null,
    allProductsCount: -1,
    currentOffset: -1,
    currentLimit: -1,
    displayProduct: null,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.GET_SHOP_PRODUCTS_REQUEST_STARTED:
            return {
                ...state,
                areProductsLoading: true,
                products: null,
                displayProduct: null,
                error: null,
                allProductsCount: -1,
                currentOffset: -1,
                currentLimit: -1
            };

        case ActionTypes.GET_ADDITIONAL_PRODUCTS_REQUEST_STARTED:
            return { ...state, areExtraProductsLoading: true };
        
        case ActionTypes.NO_MORE_PRODUCTS_TO_FETCH:
            return { ...state, areExtraProductsLoading: false, noMoreProducts: true };

        case ActionTypes.GET_SHOP_PRODUCTS_REQUEST_SUCCESS:
            return {
                ...state,
                areProductsLoading: false,
                areExtraProductsLoading: false,
                products: action.products,
                allProductsCount: action.count,
                currentLimit: action.limit,
                currentOffset: action.offset
            };

        case ActionTypes.GET_SHOP_PRODUCTS_REQUEST_FAILED:
            return { ...state, areProductsLoading: false, error: action.error };

        case ActionTypes.CLEAN_PRODUCTS_DATA: 
            return {
                ...state,
                products: null,
                allProductsCount: -1,
                currentOffset: -1,
                currentLimit: -1,
                error: null,
                noMoreProducts: false
            };

        case ActionTypes.GET_SHOP_CATEGORY_PRODUCTS:
            return { ...state, displayProduct: action.products };

        default: 
            return state;
    }
}
