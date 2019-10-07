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

// Forgot Password Action Types
export const GENERATE_RESET_PASSWORD_CODE_STARTED = 'generate_reset_password_code_started';
export const GENERATE_RESET_PASSWORD_CODE_SUCCESS = 'generate_reset_password_code_success';
export const GENERATE_RESET_PASSWORD_CODE_FAILED = 'generate_reset_password_code_failed';
export const RESET_PASSWORD_CODE_SUCCESS = 'reset_password_code_success';
export const RESET_PASSWORD_STARTED = 'reset_password_started';
export const RESET_PASSWORD_SUCCESS = 'reset_password_success';
export const RESET_PASSWORD_FAILED = 'reset_password_failed';

// Verification Code Types
export const SENDING_VERIFICATION_CODE_STARTED = 'sending_verification_code_started';
export const SENDING_VERIFICATION_CODE_SUCCESS = 'sending_verification_code_success';
export const SENDING_VERIFICATION_CODE_FAILED = 'sending_verification_code_failed';
export const VERIFYING_USER_CODE_STARTED = 'verifying_user_code_started';
export const VERIFYING_USER_CODE_SUCCESS = 'verifying_user_code_success';
export const VERIFYING_USER_CODE_FAILED = 'verifying_user_code_failed';

// Refresh Token Action
export const REFRESH_TOKEN_STARTED = 'refresh_token_started';
export const REFRESH_TOKEN_SUCCESS = 'refresh_token_success';
export const SET_REFRESH_TOKEN = 'set_refresh_token';
export const REMOVE_TOKEN = 'remove_token';
export const REFRESH_TOKEN_FAILED = 'refresh_token_failed';

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
export const CART_ITEMS_UPDATE_STARTED = 'cart_items_update_started';
export const ADD_ITEM_TO_CART = 'add_item_to_cart';
export const CHANGE_CART_ITEM_QUANTITY = 'change_cart_item_quantity';
export const REMOVE_ITEM_FROM_CART = 'remove_item_from_cart';
export const CART_ITEMS_UPDATE_FAILED = 'cart_items_update_failed';
export const FAILED_TO_UPLOAD_USER_CART_UPON_LOGIN = 'failed_to_upload_user_cart_upon_login';
export const GET_USER_CART_STARTED = 'get_user_cart_started';
export const GET_USER_CART_SUCCESS = 'get_user_cart_success';
export const GET_USER_CART_FAILED = 'get_user_cart_failed';
export const BUY_SHOP_CART_PRODUCTS_STARTED = 'but_shop_cart_products_started';
export const BUY_SHOP_CART_PRODUCTS_FAILED = 'but_shop_cart_products_failed';
export const BUY_SHOP_CART_PRODUCTS_SUCCESS = 'but_shop_cart_products_success';

// User Actions Action Types
// User's Address Action Types
export const ADD_ADDRESS_STARTED = 'add_address_started';
export const ADD_ADDRESS_SUCCESS = 'add_address_success';
export const ADD_ADDRESS_FAILED = 'add_address_failed';
export const REMOVE_ADDRESS_STARTED = 'remove_address_started';
export const REMOVE_ADDRESS_SUCCESS = 'remove_address_success';
export const REMOVE_ADDRESS_FAILED = 'remove_address_failed';
export const CHANGE_ADDRESS_STARTED = 'change_address_started';
export const CHANGE_ADDRESS_SUCCESS = 'change_address_success';
export const CHANGE_ADDRESS_FAILED = 'change_address_failed';
export const SELECT_SHIPPING_ADDRESS = 'select_shipping_address';
// User's Info Action Types
export const GET_USER_INFO_STARTED = 'get_user_info_started';
export const GET_USER_INFO_SUCCESS = 'get_user_info_success';
export const GET_USER_INFO_FAILED = 'get_user_info_failed';
