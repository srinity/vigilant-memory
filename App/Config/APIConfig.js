import Axios from 'axios';

export const APIURLs = {
    baseURL: 'http://test.com', 
    login: '/api/login',
    register: '/api/register'
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
