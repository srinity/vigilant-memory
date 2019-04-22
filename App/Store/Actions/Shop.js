import { APIURLs, AppAxios } from './../../Config/APIConfig';
import { find as _find } from 'lodash';

import {
    GET_SHOP_PRODUCTS_REQUEST_STARTED,
    GET_SHOP_PRODUCTS_REQUEST_SUCCESS,
    GET_SHOP_PRODUCTS_REQUEST_FAILED,
    GET_SHOP_CATEGORY_PRODUCTS
} from './ActionTypes';

const productsData = [
    {
        categoryId: 1,
        category: 'Category 1',
        products: [
            {
                category: 'Category 1',
                productName: 'Product 1',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 2',
                price: 200,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 3',
                price: 300,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 4',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 5',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 6',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 7',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 8',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 9',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 10',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 11',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 12',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 1',
                productName: 'Product 13',
                price: 11000,
                imgUrl: 'https://picsum.photos/300/300/?random'
            }
        ] 
    },
    {
        categoryId: 2,
        category: 'Category 2',
        products: [
            {
                category: 'Category 2',
                productName: 'Product 1',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 2',
                price: 200,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 3',
                price: 300,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 4',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 5',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 6',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 7',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 8',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 2',
                productName: 'Product 9',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            }
        ] 
    },
    {
        categoryId: 3,
        category: 'Category 3',
        products: [
            {
                category: 'Category 3',
                productName: 'Product 1',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 2',
                price: 200,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 3',
                price: 300,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 4',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 5',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 6',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 7',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 8',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 3',
                productName: 'Product 9',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            }
        ] 
    },
    {
        categoryId: 4,
        category: 'Category 4',
        products: [
            {
                category: 'Category 4',
                productName: 'Product 1',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 2',
                price: 200,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 3',
                price: 300,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 4',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 5',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 6',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 7',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 8',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                category: 'Category 4',
                productName: 'Product 9',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            }
        ] 
    },
    {
        categoryId: 5,
        category: 'Category 5',
        products: [
            {
                productName: 'Product 1',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 2',
                price: 200,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 3',
                price: 300,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 4',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 5',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 6',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 7',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 8',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            },
            {
                productName: 'Product 9',
                price: 100,
                imgUrl: 'https://picsum.photos/300/300/?random'
            }
        ] 
    }
];

export const getProducts = () => {
    return async (dispatch) => {
        dispatch(getProductsStarted());
        setTimeout(() => {
            dispatch(getProductsSuccess(productsData));
        }, 500);
    };
};

export const getCategoryProducts = (category, allShopProducts) => {
    const displayProducts = _find(
        allShopProducts,
        shopCategory => shopCategory.category === category
    );

    return { type: GET_SHOP_CATEGORY_PRODUCTS, products: displayProducts.products };
};

function getProductsStarted() {
    return { type: GET_SHOP_PRODUCTS_REQUEST_STARTED };
}

function getProductsSuccess(products) {
    return { type: GET_SHOP_PRODUCTS_REQUEST_SUCCESS, products };
}

function getProductsFailed(error) {
    return { type: GET_SHOP_PRODUCTS_REQUEST_FAILED, error };
}
