import {
    cloneDeep as _cloneDeep,
    has as _has,
    get as _get,
    remove as _remove,
    unset as _unset,
    findIndex as _findIndex,
    find as _find,
    isNil as _isNil,
    isFunction as _isFunction,
    map as _map,
    flatten as _flatten,
    forEach as _forEach
} from 'lodash';
import Toast from 'react-native-root-toast';

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
    GET_USER_CART_FAILED,
    GET_ORDERS_STARTED,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILED,
    GET_ADDITIONAL_ORDERS_STARTED,
    NO_MORE_ORDERS_TO_FETCH
} from './ActionTypes';

const CART_ITEMS_API_ACTIONS = {
    add: 'ADD_ITEM',
    remove: 'DELETE_ITEM',
    change: 'CHANGE_QUANTITY'
};

/**
 * @param  {{ token: string }} user
 */
export function getUserCart(user) {
    return async dispatch => {
        // dispatch an action indicating that that retrieving the user cart started
        dispatch(getUserCartStarted());

        try {
            const response = await AppAxios.get(APIURLs.cart, {
                headers: {
                    'Authorization': `bearer ${user.token}`
                }
            });
    
            const cart = {};

            // map the cart returned from the api to the proper shape
            _forEach(response.data.cart, shopCart => {
                cart[shopCart.shopId] = {
                    ...shopCart,
                    products: _map(shopCart.products,
                        product => ({ ...product, ...product.meta, _id: product.productId })) };
            });

            // dispatch a success action with the new cart
            dispatch(getUserCartSuccess(cart));
        } catch (error) {
            // Get the error message from the backend
            const message = _get(error.response, 'data.message', 'Something went wrong');
            Toast.show(message, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.SHORT,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });

            // dispatch an error action indicating a failure
            dispatch(getUserCartFailed(error));
        }
    };
}

/**
 * @param  {string} shopId
 * @param  {string} shopName
 * @param  {object} product
 * @param  {object} cart
 * @param  {object} user
 */
export function addToCart(shopId, shopName, product, cart, user) {
    return async dispatch => {
        const { _id: productId, quantity } = product;

        // dispatch an action indicating that that product cart quantity change started 
        dispatch(cartItemUpdateStarted(productId));

        // modify the product
        let shopCartItems = { shopId, shopName, products: [] };

        const newCart = _cloneDeep(cart);
    
        if (_has(newCart, shopId)) {
            shopCartItems = newCart[shopId];
        }
    
        shopCartItems.products.push(product);
    
        newCart[shopId] = shopCartItems;

        // if the there is a user
        // then call the api and update the cart in the backend
        if (!_isNil(user)) {
            try {
                const updates = [{ productId, quantity }];
                const response = await updateUserCart(CART_ITEMS_API_ACTIONS.add, updates, user);
                dispatch(addCartItemSuccess(productId, newCart));
            } catch (error) {
                const message = _get(error.response, 'data.message', 'Something went wrong');
                Toast.show(message, {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.SHORT,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                dispatch(updateUserCartFailed(productId, cart, error));
            }
        } else {
            // if the no user is logged in then changed the store directly
            dispatch(addCartItemSuccess(productId, newCart));
        }
    };
}

/**
 * @param  {string} shopId
 * @param  {string} shopName
 * @param  {object} product
 * @param  {object} cart
 * @param  {object} user
 */
export function changeCartProductQuantity(shopId, shopName, product, cart, user) {
    return async dispatch => {
        const { _id: productId, quantity } = product;

        // dispatch an action indicating that that product cart quantity change started 
        dispatch(cartItemUpdateStarted(productId));

        // modify the product
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
    
        // if the there is a user
        // then call the api and update the cart in the backend
        if (!_isNil(user)) {
            try {
                const updates = [{ productId, quantity }];
                const response = await updateUserCart(CART_ITEMS_API_ACTIONS.change, updates, user);
                dispatch(changeCartItemQuantity(productId, newCart));
            } catch (error) {
                const message = _get(error.response, 'data.message', 'Something went wrong');
                Toast.show(message, {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.SHORT,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                dispatch(updateUserCartFailed(productId, cart, error));
            }
        } else {
            // if the no user is logged in then changed the store directly
            dispatch(changeCartItemQuantity(productId, newCart));
        }
    };
}

/**
 * @param  {string} shopId
 * @param  {string} shopName
 * @param  {object} product
 * @param  {object} cart
 * @param  {object} user
 */
export function removeFromCart(shopId, shopName, product, cart, user) {
    return async dispatch => {
        const { _id: productId, quantity } = product;

        // dispatch an action indicating that that product cart quantity change started 
        dispatch(cartItemUpdateStarted(productId));

        // modify the product
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

        // if the there is a user
        // then call the api and update the cart in the backend
        if (!_isNil(user)) {
            try {
                const updates = [{ productId, quantity }];
                const response = await updateUserCart(CART_ITEMS_API_ACTIONS.remove, updates, user);
                dispatch(removeCartItemSuccess(productId, newCart));
            } catch (error) {
                const message = _get(error.response, 'data.message', 'Something went wrong');
                Toast.show(message, {
                    position: Toast.positions.BOTTOM,
                    duration: Toast.durations.SHORT,
                    shadow: true,
                    animation: true,
                    hideOnPress: true,
                });
                dispatch(updateUserCartFailed(productId, cart, error));
            }
        } else {
            // if the no user is logged in then changed the store directly
            dispatch(removeCartItemSuccess(productId, newCart));
        }
    };
}

/**
 * @param  {object} cart
 * @param  {object} user
 */
export function uploadUserCart(cart, user) {
    return async dispatch => {
        // update the user cart
        const updates = _flatten(
            _map(cart, shop => 
                _map(shop.products, product =>
                    ({ productId: product._id, quantity: product.quantity })
                )
            )
        );

        try {
            const response = await updateUserCart(CART_ITEMS_API_ACTIONS.add, updates, user);
        } catch (error) {
            const message = _get(error.response, 'data.message', 'Something went wrong');
            Toast.show(message, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.SHORT,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            dispatch({ type: FAILED_TO_UPLOAD_USER_CART_UPON_LOGIN });
        }
    };
}

/**
 * @param  {object} user
 * @param  {string} shopId
 * @param  {array} products
 * @param  {object} userAddress
 * @param  {object} cart
 * @param  {Function} onBuy
 */
export function buyShopProducts(user, shopId, products, userAddress, cart, onBuy) {
    return async dispatch => {
        // dispatch an action to indicate that the buy action started
        dispatch(buyingProductsStarted());

        try {
            // construct the body of the request
            const body = {
                shop: shopId,
                userAddress,
                productOrders: _map(products, product => ({ product: product.productId, quantity: product.quantity }))
            };

            const response = await AppAxios.post(APIURLs.buy, body, {
                headers: {
                    'Authorization': `bearer ${user.token}`
                }
            });

            // remove the shop from the cart after the buy
            _unset(cart, shopId);

            if (_isFunction(onBuy)) {
                // execute onBuy if provided
                onBuy();
            }

            Toast.show(response.data.message, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.SHORT,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
        } catch (error) {
            const message = _get(error.response, 'data.message', 'Something went wrong');
            Toast.show(message, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.SHORT,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            dispatch(buyingProductFailed(error.response));
        }
    };
}

/**
 * @param  {boolean} shouldClean
 * @param  {number} currentLimit
 * @param  {number} currentOffset
 * @param  {number} ordersCount
 * @param  {Array} currentOrders
 * @param  {object} user
 */
export function getOrders(shouldClean, currentLimit, currentOffset, ordersCount, currentOrders, user) {
    return async dispatch => {
        // dispatch an action indicating that getting order started
        dispatch(getOrdersStarted(shouldClean));

        try {
            const currentOrdersCount = _get(currentOrders, 'length', 0);

            if (ordersCount !== -1 && currentOrdersCount >= ordersCount) {
                // fetched all if the user's orders
                dispatch(noMoreOrdersToFetch());
            } else {
                const params = {};
    
                if (currentLimit !== -1 && !_isNil(currentLimit)) {
                    params.limit = currentLimit;
                }
    
                if (currentOffset !== -1 && !_isNil(currentOffset)) {
                    params.offset = currentOffset + (params.limit || 0);
                }

                // get the new orders after the currently displayed orders
                const response = await AppAxios.get(APIURLs.getOrders, {
                    headers: {
                        'Authorization': `bearer ${user.token}`
                    },
                    params
                });
                // console.tron.warn(response.data);

                const { orders, count } = response.data;
    
                let allOrders = orders;
        
                if (!_isNil(currentOrders) && !shouldClean) {
                    allOrders = [...currentOrders, ...orders];
                }
    
                // dispatch the success action with the new orders
                dispatch(getOrdersSuccess(allOrders, count, currentLimit, params.offset || currentLimit));
            }
        } catch (error) {
            // console.tron.error(error);

            const message = _get(error.response, 'data.message', 'Something went wrong');
            Toast.show(message, {
                position: Toast.positions.BOTTOM,
                duration: Toast.durations.SHORT,
                shadow: true,
                animation: true,
                hideOnPress: true,
            });
            dispatch(getOrdersFailed(error.response));
        }
    };
}

/**
 * @param  {object} product
 * @param  {string} shopId
 * @param  {object} cart
 */
export function checkIfIProductsInCart(product, shopId, cart) {
    // check if the product is already in the cart
    const shopCartProducts = _get(cart[shopId], 'products', []);

    return _findIndex(shopCartProducts, item =>
        item._id === product._id && item.category === product.category) !== -1;
}

/**
 * @param  {object} product
 * @param  {string} shopId
 * @param  {object} cart
 */
export function getProductQuantityInCart(product, shopId, cart) {
    // check if the product is already in the cart if so return its quantity else return 0
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

function getOrdersStarted(shouldClean) {
    if (shouldClean) {
        return { type: GET_ORDERS_STARTED };
    }

    return { type: GET_ADDITIONAL_ORDERS_STARTED };
}

function noMoreOrdersToFetch() {
    return { type: NO_MORE_ORDERS_TO_FETCH };
}

function getOrdersSuccess(orders, count, currentLimit, currentOffset) {
    return { type: GET_ORDERS_SUCCESS, orders, count, currentLimit, currentOffset };
}

function getOrdersFailed(error) {
    return { type: GET_ORDERS_FAILED, error };
}
