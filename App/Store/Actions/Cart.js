import {
    cloneDeep as _cloneDeep,
    has as _has,
    get as _get,
    remove as _remove,
    unset as _unset,
    findIndex as _findIndex,
    find as _find
} from 'lodash';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

import {
    ADD_ITEM_TO_CART,
    CHANGE_CART_ITEM_QUANTITY,
    REMOVE_ITEM_FROM_CART,
    BUY_SHOP_CART_PRODUCTS_STARTED,
    BUY_SHOP_CART_PRODUCTS_FAILED,
    BUY_SHOP_CART_PRODUCTS_SUCCESS
} from './ActionTypes';

export function addToCart(shopId, shopName, product, cart) {
    let shopCartItems = { shopId, shopName, products: [] };

    if (_has(cart, shopId)) {
        shopCartItems = cart[shopId];
    }

    shopCartItems.products.push(product);

    const newCart = _cloneDeep(cart);
    newCart[shopId] = shopCartItems;

    console.tron.error(newCart);

    return { type: ADD_ITEM_TO_CART, cart: newCart };
}

export function changeCartProductQuantity(shopId, shopName, product, cart) {
    let shopCartItems = { shopId, shopName, products: [] };

    if (_has(cart, shopId)) {
        shopCartItems = cart[shopId];
    }

    const productIndex = _findIndex(shopCartItems.products, item => item._id === product._id);

    if (productIndex !== -1) {
        shopCartItems.products[productIndex] = product;
    } else {
        shopCartItems.products.push(product);
    }

    const newCart = _cloneDeep(cart);
    newCart[shopId] = shopCartItems;

    console.tron.error(newCart);

    return { type: CHANGE_CART_ITEM_QUANTITY, cart: newCart };
}

export function removeFromCart(shopId, shopName, product, cart) {
    let shopCartItems = { shopId, shopName, products: [] };

    if (_has(cart, shopId)) {
        shopCartItems = cart[shopId];
        _remove(shopCartItems.products, item => item._id === product._id);
    }

    const newCart = _cloneDeep(cart);

    if (shopCartItems.products.length === 0) {
        _unset(newCart, shopId);
    } else {
        newCart[shopId] = shopCartItems;
    }
    
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

export function checkIfIProductsInCart(product, shopId, cart) {
    const shopCartProducts = _get(cart[shopId], 'products', []);

    return _findIndex(shopCartProducts, item =>
        item._id === product._id && item.category === product.category) !== -1;
}

export function getProductQuantityInCart(product, shopId, cart) {
    const shopCartProducts = _get(cart[shopId], 'products', []);

    const cartProduct = _find(shopCartProducts, item =>
        item._id === product._id && item.category === product.category);

    return cartProduct ? cartProduct.quantity : 0;
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
