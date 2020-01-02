import {
    isNil as _isNil,
    zipWith as _zipWith,
    map as _map,
    get as _get,
    reduce as _reduce
} from 'lodash';
import Toast from 'react-native-root-toast';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

import {
    GET_SHOP_PRODUCTS_REQUEST_STARTED,
    GET_SHOP_PRODUCTS_REQUEST_SUCCESS,
    GET_SHOP_PRODUCTS_REQUEST_FAILED,
    CLEAN_PRODUCTS_DATA,
    GET_ADDITIONAL_PRODUCTS_REQUEST_STARTED,
    NO_MORE_PRODUCTS_TO_FETCH
} from './ActionTypes';

/**
 * @param  {string} shopId
 * @param  {Array} products
 * @param  {number} currentLimit
 * @param  {number} currentOffset
 * @param  {number} productsCount
 */
export const getProducts = (shopId, products, currentLimit, currentOffset, productsCount) => {
    return async (dispatch) => {
        // dispatch an action indicating that getting the products started
        dispatch(getProductsStarted(products));

        try {
            const categoryProductsCountArr = _map(products, product =>
                _get(product, 'shopProducts.length', 0));
            const currentProductsCount = _reduce(categoryProductsCountArr,
                (sum, currentCategoryCount) => sum + currentCategoryCount, 0);

            if (productsCount !== -1 && !_isNil(productsCount) && currentProductsCount >= productsCount) {
                // no more products to fetch
                dispatch(noMoreProductsToFetch());
            } else {
                const params = {
                    shop: shopId
                };
    
                if (currentLimit !== -1 && !_isNil(currentLimit)) {
                    params.limit = currentLimit;
                }
    
                if (currentOffset !== -1 && !_isNil(currentOffset)) {
                    params.offset = currentOffset + (params.limit || 0);
                }

                // get the next products
                const response = await AppAxios.get(APIURLs.getProductsOfShopGroupedByCategory, {
                    params
                });
    
                const { shopProducts, count, offset, limit } = response.data;
    
                let allProducts = shopProducts;
    
                // concat the old products with the newly fetched ones
                if (!_isNil(products)) {
                    allProducts = _zipWith(products, shopProducts, (oldProduct, newProduct) => {
                        return {
                            ...oldProduct,
                            shopProducts: [...oldProduct.shopProducts, ...newProduct.shopProducts]
                        };
                    });
                }
    
                // dispatch an action with the all the products
                dispatch(getProductsSuccess(allProducts, count, offset, limit));
            }
        } catch (error) {
            const message = _get(error.response, 'data.message', 'Something went wrong');
            Toast.show(message, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.SHORT,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });

            dispatch(getProductsFailed(error));
        }
    };
};

export const cleanProductsData = () => {
    return { type: CLEAN_PRODUCTS_DATA };
};

function getProductsStarted(products) {
    if (!_isNil(products)) {
        return { type: GET_ADDITIONAL_PRODUCTS_REQUEST_STARTED };
    }

    return { type: GET_SHOP_PRODUCTS_REQUEST_STARTED };
}

function noMoreProductsToFetch() {
    return { type: NO_MORE_PRODUCTS_TO_FETCH };
}

function getProductsSuccess(products, count, offset, limit) {
    return { type: GET_SHOP_PRODUCTS_REQUEST_SUCCESS, products, count, offset, limit };
}

function getProductsFailed(error) {
    return { type: GET_SHOP_PRODUCTS_REQUEST_FAILED, error };
}
