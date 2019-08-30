import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    areCategoryProductsLoading: false,
    areExtraCategoryProductsLoading: false,
    categoryProducts: null,
    noMoreCategoryProducts: false,
    allCategoryProductsCount: -1,
    currentOffset: -1,
    currentLimit: -1,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.GET_SHOP_CATEGORY_PRODUCTS_STARTED:
            return {
                ...state,
                areCategoryProductsLoading: true,
                categoryProducts: null,
                error: null,
                allCategoryProductsCount: -1,
                currentOffset: -1,
                currentLimit: -1
            };

        case ActionTypes.GET_SHOP_CATEGORY_PRODUCTS_SUCCESS:
            return {
                ...state,
                areCategoryProductsLoading: false,
                areExtraCategoryProductsLoading: false,
                categoryProducts: action.products,
                allCategoryProductsCount: action.count,
                currentLimit: action.limit,
                currentOffset: action.offset
            };

        case ActionTypes.GET_SHOP_CATEGORY_PRODUCTS_FAILED:
            return {
                ...state,
                areCategoryProductsLoading: false,
                areExtraCategoryProductsLoading: false,
                error: action.error
            };

        case ActionTypes.GET_ADDITIONAL_SHOP_CATEGORY_PRODUCTS_REQUEST_STARTED:
                return { ...state, areExtraCategoryProductsLoading: true, error: null };
            
        case ActionTypes.NO_MORE_SHOP_CATEGORY_PRODUCTS_TO_FETCH:
            return {
                ...state,
                areExtraCategoryProductsLoading: false,
                noMoreCategoryProducts: true
            };

        case ActionTypes.CLEAN_CATEGORY_PRODUCTS_DATA: 
            return {
                ...state,
                categoryProducts: null,
                allCategoryProductsCount: -1,
                currentOffset: -1,
                currentLimit: -1,
                error: null,
                noMoreCategoryProducts: false,
                areCategoryProductsLoading: false,
                areExtraCategoryProductsLoading: false
            };

        default: 
            return state;
    }
}
