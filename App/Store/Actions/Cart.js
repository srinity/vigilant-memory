import {
    cloneDeep as _cloneDeep,
    has as _has,
    remove as _remove,
    unset as _unset
} from 'lodash';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

import {
    ADD_ITEM_TO_CART,
    REMOVE_ITEM_FROM_CART,
    BUY_SHOP_CART_PRODUCTS_STARTED,
    BUY_SHOP_CART_PRODUCTS_FAILED,
    BUY_SHOP_CART_PRODUCTS_SUCCESS
} from './ActionTypes';

export function addToCart(shop, product, cart) {
    let shopCartItems = [];

    if (_has(cart, shop)) {
        shopCartItems = cart[shop];
    }

    shopCartItems.push(product);

    const newCart = _cloneDeep(cart);
    newCart[shop] = shopCartItems;

    console.tron.error(newCart);

    return { type: ADD_ITEM_TO_CART, cart: newCart };
}

export function removeFromCart(shop, product, cart) {
    let shopCartItems = [];

    if (_has(cart, shop)) {
        shopCartItems = cart[shop];
        _remove(shopCartItems, item => item.productName === product.productName);
    }

    const newCart = _cloneDeep(cart);
    newCart[shop] = shopCartItems;
    
    return { type: REMOVE_ITEM_FROM_CART, cart: newCart };
}

export function buyShopProducts(user, products, cart) {
    return dispatch => {
        dispatch(buyingProductsStarted());

        setTimeout(() => {
            const cartClone = _cloneDeep(cart);
            _unset(cartClone, products.shopName);
            console.tron.warn(cartClone);
            dispatch(buyingProductSuccess(cartClone));
        }, 1000);
    };
}

function buyingProductsStarted() {
    return { type: BUY_SHOP_CART_PRODUCTS_STARTED };
}

function buyingProductSuccess(newCart) {
    return { type: BUY_SHOP_CART_PRODUCTS_SUCCESS, cart: newCart };
}

function buyingProductFailed(error) {
    return { type: BUY_SHOP_CART_PRODUCTS_FAILED, error };
}
