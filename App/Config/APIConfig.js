import Axios from 'axios';

export const APIURLs = {
  baseURL: 'http://bd69e752.ngrok.io',
  login: '/api/login',
  register: '/api/users/signin'
};

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
