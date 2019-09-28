import {
    cloneDeep as _cloneDeep,
    has as _has,
    get as _get,
    remove as _remove,
    unset as _unset,
    findIndex as _findIndex,
    find as _find,
    isNil as _isNil,
    map as _map,
    flatten as _flatten,
    forEach as _forEach
} from 'lodash';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

import {
    ADD_ITEM_TO_CART,
    CHANGE_CART_ITEM_QUANTITY,
    REMOVE_ITEM_FROM_CART,
    BUY_SHOP_CART_PRODUCTS_STARTED,
    BUY_SHOP_CART_PRODUCTS_FAILED,
    BUY_SHOP_CART_PRODUCTS_SUCCESS,
    CART_ITEMS_UPDATE_STARTED,
    CART_ITEMS_UPDATE_FAILED,
    FAILED_TO_UPLOAD_USER_CART_UPON_LOGIN,
    GET_USER_CART_STARTED,
    GET_USER_CART_SUCCESS,
    GET_USER_CART_FAILED
} from './ActionTypes';

const CART_ITEMS_API_ACTIONS = {
    add: 'ADD_ITEM',
    remove: 'DELETE_ITEM',
    change: 'CHANGE_QUANTITY'
};

export function getUserCart(user) {
    return async dispatch => {
        dispatch(getUserCartStarted());

        try {
            const response = await AppAxios.get(APIURLs.cart, {
                headers: {
                    'Authorization': `bearer ${user.token}`
                }
            });
    
            console.tron.warn(response);
            const cart = {};

            _forEach(response.data.cart, shopCart => {
                cart[shopCart.shopId] = {
                    ...shopCart,
                    products: _map(shopCart.products,
                        product => ({ ...product, ...product.meta, _id: product.productId })) };
            });

            dispatch(getUserCartSuccess(cart));
        } catch (error) {
            console.tron.error(error);
            dispatch(getUserCartFailed(error));
        }
    };
}

export function addToCart(shopId, shopName, product, cart, user) {
    return async dispatch => {
        const { _id: productId, quantity } = product;

        dispatch(cartItemUpdateStarted(productId));

        let shopCartItems = { shopId, shopName, products: [] };

        const newCart = _cloneDeep(cart);
    
        if (_has(newCart, shopId)) {
            shopCartItems = newCart[shopId];
        }
    
        shopCartItems.products.push(product);
    
        newCart[shopId] = shopCartItems;

        if (!_isNil(user)) {
            try {
                const updates = [{ productId, quantity }];
                const response = await updateUserCart(CART_ITEMS_API_ACTIONS.add, updates, user);
                console.tron.warn(response);
                dispatch(addCartItemSuccess(productId, newCart));
            } catch (error) {
                console.tron.error(error);
                dispatch(updateUserCartFailed(productId, cart, error));
            }
        } else {
            dispatch(addCartItemSuccess(productId, newCart));
        }
    };
}

export function changeCartProductQuantity(shopId, shopName, product, cart, user) {
    return async dispatch => {
        const { _id: productId, quantity } = product;

        dispatch(cartItemUpdateStarted(productId));

        let shopCartItems = { shopId, shopName, products: [] };

        const newCart = _cloneDeep(cart);
    
        if (_has(newCart, shopId)) {
            shopCartItems = newCart[shopId];
        }
    
        const productIndex = _findIndex(shopCartItems.products, item => item._id === productId);
    
        if (productIndex !== -1) {
            shopCartItems.products[productIndex] = product;
        } else {
            shopCartItems.products.push(product);
        }
    
        newCart[shopId] = shopCartItems;
    
        if (!_isNil(user)) {
            try {
                const updates = [{ productId, quantity }];
                const response = await updateUserCart(CART_ITEMS_API_ACTIONS.change, updates, user);
                console.tron.warn(response);
                dispatch(changeCartItemQuantity(productId, newCart));
            } catch (error) {
                console.tron.error(error);
                dispatch(updateUserCartFailed(productId, cart, error));
            }
        } else {
            dispatch(changeCartItemQuantity(productId, newCart));
        }
    };
}

export function removeFromCart(shopId, shopName, product, cart, user) {
    return async dispatch => {
        const { _id: productId, quantity } = product;

        dispatch(cartItemUpdateStarted(productId));

        let shopCartItems = { shopId, shopName, products: [] };

        const newCart = _cloneDeep(cart);
    
        if (_has(newCart, shopId)) {
            shopCartItems = newCart[shopId];
            _remove(shopCartItems.products, item => item._id === productId);
        }
    
        if (shopCartItems.products.length === 0) {
            _unset(newCart, shopId);
        } else {
            newCart[shopId] = shopCartItems;
        }

        if (!_isNil(user)) {
            try {
                const updates = [{ productId, quantity }];
                const response = await updateUserCart(CART_ITEMS_API_ACTIONS.remove, updates, user);
                console.tron.warn(response);
                dispatch(removeCartItemSuccess(productId, newCart));
            } catch (error) {
                console.tron.error(error);
                dispatch(updateUserCartFailed(productId, cart, error));
            }
        } else {
            dispatch(removeCartItemSuccess(productId, newCart));
        }
    };
}

export function uploadUserCart(cart, user) {
    return async dispatch => {
        const updates = _flatten(
            _map(cart, shop => 
                _map(shop.products, product =>
                    ({ productId: product._id, quantity: product.quantity })
                )
            )
        );
        console.tron.error(updates);

        try {
            const response = await updateUserCart(CART_ITEMS_API_ACTIONS.add, updates, user);
            console.tron.warn(response);
        } catch (error) {
            console.tron.error(error);
            dispatch({ type: FAILED_TO_UPLOAD_USER_CART_UPON_LOGIN });
        }
    };
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

function updateUserCart(action, updates, user) {
    const reqBody = {
        action,
        updates
    };

    return AppAxios.patch(APIURLs.cart, reqBody, {
        headers: {
            'Authorization': `bearer ${user.token}`
        }
    });
}

function getUserCartStarted() {
    return { type: GET_USER_CART_STARTED };
}

function getUserCartSuccess(cart) {
    return { type: GET_USER_CART_SUCCESS, cart };
}

function getUserCartFailed(error) {
    return { type: GET_USER_CART_FAILED, error };
}

function cartItemUpdateStarted(productId) {
    return { type: CART_ITEMS_UPDATE_STARTED, productId };
}

function addCartItemSuccess(productId, newCart) {
    return { type: ADD_ITEM_TO_CART, cart: newCart, productId };
}

function removeCartItemSuccess(productId, newCart) {
    return { type: REMOVE_ITEM_FROM_CART, cart: newCart, productId };
}

function changeCartItemQuantity(productId, newCart) {
    return { type: CHANGE_CART_ITEM_QUANTITY, cart: newCart, productId };
}

function updateUserCartFailed(productId, oldCart, error) {
    return { type: CART_ITEMS_UPDATE_FAILED, productId, cart: oldCart, error };
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
