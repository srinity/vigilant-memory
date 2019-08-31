// Device Dimensions Action Types
export const DEVICE_DIMENSIONS_CHANGED = 'DEVICE_DIMENSIONS_CHANGED';

// Login Action Types
export const LOGIN_REQUEST_STARTED = 'login_request_started';
export const LOGIN_REQUEST_SUCCESS = 'login_request_success';
export const LOGIN_REQUEST_FAILED = 'login_request_failed';

// Register Action Types
export const REGISTER_REQUEST_STARTED = 'register_request_started';
export const REGISTER_REQUEST_SUCCESS = 'register_request_success';
export const REGISTER_REQUEST_FAILED = 'register_request_failed';

// Verification Code Types
export const SENDING_VERIFICATION_CODE_STARTED = 'sending_verification_code_started';
export const SENDING_VERIFICATION_CODE_SUCCESS = 'sending_verification_code_success';
export const SENDING_VERIFICATION_CODE_FAILED = 'sending_verification_code_failed';
export const VERIFYING_USER_CODE_STARTED = 'verifying_user_code_started';
export const VERIFYING_USER_CODE_SUCCESS = 'verifying_user_code_success';
export const VERIFYING_USER_CODE_FAILED = 'verifying_user_code_failed';

// Logout Action Types 
export const LOGOUT_REQUEST_STARTED = 'logout_request_started';
export const LOGOUT_REQUEST_SUCCESS = 'logout_request_success';
export const LOGOUT_REQUEST_FAILED = 'logout_request_failed';

// Shops Action Types
export const GET_SEARCH_AREAS_SUCCESS = 'get_search_areas_success';
export const GET_SEARCH_AREAS_FAILED = 'get_search_areas_failed';
export const GET_SHOPS_REQUEST_STARTED = 'get_shops_request_started';
export const GET_SHOPS_REQUEST_SUCCESS = 'get_shops_request_success';
export const GET_SHOPS_REQUEST_FAILED = 'get_shops_request_failed';

// Shop Action Types
export const GET_SHOP_PRODUCTS_REQUEST_STARTED = 'get_shop_products_request_started';
export const GET_SHOP_PRODUCTS_REQUEST_SUCCESS = 'get_shop_products_request_success';
export const GET_SHOP_PRODUCTS_REQUEST_FAILED = 'get_shop_products_request_failed';
export const GET_ADDITIONAL_PRODUCTS_REQUEST_STARTED = 'get_additional_products_request_started';
export const NO_MORE_PRODUCTS_TO_FETCH = 'no_more_products_to_fetch';
export const CLEAN_PRODUCTS_DATA = 'clean_products_data';

// Products Action Types
export const GET_SHOP_CATEGORY_PRODUCTS_STARTED = 'get_shop_category_products_started';
export const GET_SHOP_CATEGORY_PRODUCTS_SUCCESS = 'get_shop_category_products_success';
export const GET_SHOP_CATEGORY_PRODUCTS_FAILED = 'get_shop_category_products_failed';
export const GET_ADDITIONAL_SHOP_CATEGORY_PRODUCTS_REQUEST_STARTED = 'get_additional_shop_category_products_request_started';
export const NO_MORE_SHOP_CATEGORY_PRODUCTS_TO_FETCH = 'no_more_shop_category_products_to_fetch';
export const CLEAN_CATEGORY_PRODUCTS_DATA = 'clean_category_products_data';

// Cart Action Types
export const ADD_ITEM_TO_CART = 'add_item_to_cart';
export const CHANGE_CART_ITEM_QUANTITY = 'change_cart_item_quantity';
export const REMOVE_ITEM_FROM_CART = 'remove_item_from_cart';
export const BUY_SHOP_CART_PRODUCTS_STARTED = 'but_shop_cart_products_started';
export const BUY_SHOP_CART_PRODUCTS_FAILED = 'but_shop_cart_products_failed';
export const BUY_SHOP_CART_PRODUCTS_SUCCESS = 'but_shop_cart_products_success';
