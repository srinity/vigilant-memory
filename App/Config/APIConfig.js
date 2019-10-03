import Axios from 'axios';

export const APIURLs = {
  baseURL: 'https://e69d32e2.ngrok.io',
  login: '/api/auth/login',
  register: '/api/auth/signup',
  sendCode: '/api/auth/generateVerificationCode',
  verifyCode: '/api/auth/verifyCode',
  refreshToken: '/api/auth/refreshToken',
  searchAreas: '/api/admin/addresses/city',
  getShops: '/api/client/shop/getShopsAtSpecificArea',
  getProductsOfShopGroupedByCategory: '/api/client/shop/getProductsOfShopGroupedByCategory',
  getProductsOfShopBasedOnFilter: '/api/client/shop/getProductsOfShopBasedOnFilter',
  cart: '/api/user/cart',
  updateAddress: '/api/user/address',
  userData: '/api/user/me',
  buy: '/api/client/order',
};

export const ImageHostUrl = 'https://s3-us-west-2.amazonaws.com/elcartona/';

export const APIHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'appversionheader': '1.0'
};

export const AppAxios = Axios.create({
  baseURL: APIURLs.baseURL,
  headers: {
    ...APIHeaders
  },
  timeout: 5000
});
