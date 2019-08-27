import Axios from 'axios';

export const APIURLs = {
  baseURL: 'https://1d25978a.ngrok.io',
  login: '/api/login',
  register: '/api/users/signin',
  searchAreas: '/api/admin/addresses/city',
  getShops: '/api/client/shop/getShopsAtSpecificArea',
  getProductsOfShopGroupedByCategory: '/api/client/shop/getProductsOfShopGroupedByCategory',
  getProductsOfShopBasedOnFilter: '/api/client/shop/getProductsOfShopBasedOnFilter'
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
  }
});
