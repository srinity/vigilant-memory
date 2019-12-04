import Axios from 'axios';
import { get as _get } from 'lodash';

import { removeToken, setRefreshToken } from '../Store/Actions/Account';

export const APIURLs = {
  baseURL: 'https://403ff698.ngrok.io',
  login: '/api/auth/login',
  register: '/api/auth/signup',
  sendCode: '/api/auth/generateVerificationCode',
  verifyCode: '/api/auth/verifyCode',
  refreshToken: '/api/auth/refreshToken',
  forgotPassword: '/api/auth/forgetPassword',
  resetPassword: '/api/auth/updatePassword',
  searchAreas: '/api/admin/addresses/city',
  getShops: '/api/client/shop/getShopsAtSpecificArea',
  getProductsOfShopGroupedByCategory: '/api/client/shop/getProductsOfShopGroupedByCategory',
  getProductsOfShopBasedOnFilter: '/api/client/shop/getProductsOfShopBasedOnFilter',
  cart: '/api/user/cart',
  updateAddress: '/api/user/address',
  userData: '/api/user/me',
  buy: '/api/client/order',
  addDeviceId: '/api/user/deviceId',
  getOrders: '/api/client/getclientorders'
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

export function refreshTokenInterceptor(dispatch) {
  AppAxios.interceptors.response.use(
    response => response,
    error => {
      const errorResponseStatus = _get(error, 'response.status');
  
      console.tron.error(error);
      if (errorResponseStatus !== 400) {
        return Promise.reject(error);
      }

      // need to call refresh token
      const requestToken = _get(error, 'response.config.headers.Authorization');

      if (requestToken) {
        Axios.post(`${APIURLs.baseURL}${APIURLs.refreshToken}`, undefined, {
          headers: {
            'Authorization': requestToken
          }
        }).then(response => {
          console.tron.warn(response.data);
          const { message, ...userData } = response.data;
          dispatch(setRefreshToken(userData));
          error.response.config.headers['Authorization'] = `bearer ${response.data.token}`;
          return AppAxios(error.response.config);
        }).catch(err => {
          console.tron.error(err);
          dispatch(removeToken());
          return Promise.reject(error);
        });
        // dispatch(refreshToken({ token: requestToken }));
      }

      return Promise.reject(error);
    }
  );
}
