import { APIURLs, AppAxios } from './../../Config/APIConfig';
import {
    find as _find,
    isNil as _isNil,
    zipWith as _zipWith,
    map as _map,
    get as _get,
    reduce as _reduce
} from 'lodash';

import {
    GET_SHOP_CATEGORY_PRODUCTS_STARTED,
    GET_SHOP_CATEGORY_PRODUCTS_SUCCESS,
    GET_SHOP_CATEGORY_PRODUCTS_FAILED,
    GET_ADDITIONAL_SHOP_CATEGORY_PRODUCTS_REQUEST_STARTED,
    NO_MORE_SHOP_CATEGORY_PRODUCTS_TO_FETCH,
    CLEAN_CATEGORY_PRODUCTS_DATA
} from './ActionTypes';

export const getCategoryProducts = (
    shopId,
    category,
    products,
    currentLimit,
    currentOffset,
    productsCount,
    shouldCleanData
) => {
    return async (dispatch) => {
        if (shouldCleanData) {
            dispatch(cleanCategoryProductsData());
        }

        dispatch(getCategoryProductsStarted(shouldCleanData ? null : products));

        try {
            const currentProductsCount = _get(products, 'length', 0);

            if (productsCount !== -1 && currentProductsCount >= productsCount && !shouldCleanData) {
                dispatch(noMoreCategoryProductsToFetch());
            } else {
                const params = {
                    'criteria[shop]': shopId
                };
    
                if (!_isNil(category)) {
                    params['criteria[category]'] = category;
                }
    
                if (currentLimit !== -1 && !_isNil(currentLimit)) {
                    params.limit = currentLimit;
                }
    
                if (currentOffset !== -1 && !_isNil(currentOffset) && !shouldCleanData) {
                    params.offset = currentOffset + (params.limit || 0);
                }
    
                const response = await AppAxios.get(APIURLs.getProductsOfShopBasedOnFilter, {
                    params
                });
    
                const { shopProducts, count, offset, limit } = response.data;
    
                let allProducts = shopProducts;
        
                if (!_isNil(products) && !shouldCleanData) {
                    allProducts = [...products, ...shopProducts];
                }
    
                dispatch(getCategoryProductsSuccess(allProducts, count, offset, limit));
            }
        } catch (error) {
            dispatch(getCategoryProductsFailed(error));
        }
    };
};

export const cleanCategoryProductsData = () => {
    return { type: CLEAN_CATEGORY_PRODUCTS_DATA };
};

function getCategoryProductsStarted(products) {
    if (!_isNil(products)) {
        return { type: GET_ADDITIONAL_SHOP_CATEGORY_PRODUCTS_REQUEST_STARTED };
    }

    return { type: GET_SHOP_CATEGORY_PRODUCTS_STARTED };
}

function noMoreCategoryProductsToFetch() {
    return { type: NO_MORE_SHOP_CATEGORY_PRODUCTS_TO_FETCH };
}

function getCategoryProductsSuccess(products, count, offset, limit) {
    return { type: GET_SHOP_CATEGORY_PRODUCTS_SUCCESS, products, count, offset, limit };
}

function getCategoryProductsFailed(error) {
    return { type: GET_SHOP_CATEGORY_PRODUCTS_FAILED, error };
}

