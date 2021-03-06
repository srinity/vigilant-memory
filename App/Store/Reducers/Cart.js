import { ActionTypes } from './../Actions';

const INITIAL_STATE = {
    cart: {},
    error: null,
    isBuyingLoading: false,
    cartItemsIsLoadingObject: {},
    updateUserCartError: null,
    cartItemsAreLoading: false,
    cartItemsLoadedError: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.GET_USER_CART_STARTED: 
            return { ...state, cartItemsAreLoading: true, cartItemsLoadedError: null };
        
        case ActionTypes.GET_USER_CART_SUCCESS: 
            return { ...state, cartItemsAreLoading: false, cart: action.cart };

        case ActionTypes.GET_USER_CART_FAILED:
            return { ...state, cartItemsAreLoading: false, cartItemsLoadedError: action.error };

        case ActionTypes.CART_ITEMS_UPDATE_STARTED:
            return {
                ...state,
                cartItemsIsLoadingObject: { ...state.cartItemsIsLoadingObject, [action.productId]: true },
                updateUserCartError: null
            };

        case ActionTypes.ADD_ITEM_TO_CART:
            return {
                ...state,
                cart: action.cart,
                cartItemsIsLoadingObject: { ...state.cartItemsIsLoadingObject, [action.productId]: false }
            };

        case ActionTypes.CHANGE_CART_ITEM_QUANTITY:
                return {
                    ...state,
                    cart: action.cart,
                    cartItemsIsLoadingObject: { ...state.cartItemsIsLoadingObject, [action.productId]: false }
                };

        case ActionTypes.REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                cart: action.cart,
                cartItemsIsLoadingObject: { ...state.cartItemsIsLoadingObject, [action.productId]: false }
            };

        case ActionTypes.CART_ITEMS_UPDATE_FAILED:
            return {
                ...state,
                cart: action.cart,
                cartItemsIsLoadingObject: { ...state.cartItemsIsLoadingObject, [action.productId]: false },
                updateUserCartError: action.error
            };

        case ActionTypes.BUY_SHOP_CART_PRODUCTS_STARTED:
            return { ...state, isBuyingLoading: true, error: null };
        
        case ActionTypes.BUY_SHOP_CART_PRODUCTS_SUCCESS:
            return { ...state, isBuyingLoading: false, error: null, cart: action.cart };

        case ActionTypes.BUY_SHOP_CART_PRODUCTS_FAILED:
            return { ...state, isBuyingLoading: false, error: action.error };

        // case ActionTypes.FAILED_TO_UPLOAD_USER_CART_UPON_LOGIN:
        //     return { ...state, cart: {} };

        case ActionTypes.LOGOUT_REQUEST_SUCCESS:
            return { ...state, cart: {} };

        default:
            return state;
    }
}
