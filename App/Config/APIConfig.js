import Axios from 'axios';

export const APIURLs = {
  baseURL: 'https://a6dfc912.ngrok.io',
  login: '/api/login',
  register: '/api/users/signin',
  searchAreas: '/api/admin/addresses/city',
  getShops: '/api/client/shop/getShopsAtSpecificArea'
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
