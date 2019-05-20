import { ActionTypes } from './../Actions';

const INITIAL_STATE = {
    cart: {},
    error: null,
    isLoading: false
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.ADD_ITEM_TO_CART:
            return { ...state, cart: action.cart };

        case ActionTypes.REMOVE_ITEM_FROM_CART:
            return { ...state, cart: action.cart };

        case ActionTypes.BUY_SHOP_CART_PRODUCTS_STARTED:
            return { ...state, isLoading: true, error: null };
        
        case ActionTypes.BUY_SHOP_CART_PRODUCTS_SUCCESS:
            return { ...state, isLoading: false, error: null, cart: action.cart };

        case ActionTypes.BUY_SHOP_CART_PRODUCTS_FAILED:
            return { ...state, isLoading: false, error: action.error };

        default:
            return state;
    }
}
