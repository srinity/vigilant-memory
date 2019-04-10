import {
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  REGISTER_REQUEST_STARTED,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_STARTED
} from './ActionTypes';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequestStarted());
      const response = await AppAxios.post(APIURLs.login, { email, password });
      console.tron.log(response.data);
      dispatch(loginRequestSuccess(response.data));
    } catch (error) {
      console.tron.error(error);
      console.tron.error(error.response);
      dispatch(loginRequestFailed(error.response));
    }
  };
};

export const register = (firstName, lastName, email, password, phone) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequestStarted());

      const response = await AppAxios.post(APIURLs.register, {
        fullName: {
          firstName,
          lastName
        },
        email,
        password,
        phone,
        userRole: 'user'
      });
      console.tron.log(response);
      dispatch(registerRequestSuccess(response.data));
    } catch (error) {
      console.tron.error(error);
      dispatch(registerRequestFailed(error.response));
    }
  };
};

export const logout = () => {
  return dispatch => {
    // dispatch(logoutRequestStarted());
    dispatch(logoutRequestSuccess());
  };
};

function loginRequestStarted() {
  return { type: LOGIN_REQUEST_STARTED };
}

function loginRequestSuccess(user) {
  return { type: LOGIN_REQUEST_SUCCESS, user };
}

function loginRequestFailed(error) {
  return { type: LOGIN_REQUEST_FAILED, error };
}

function registerRequestStarted() {
  return { type: REGISTER_REQUEST_STARTED };
}

function registerRequestSuccess(user) {
  return { type: REGISTER_REQUEST_SUCCESS, user };
}

function registerRequestFailed(error) {
  return { type: REGISTER_REQUEST_FAILED, error };
}

function logoutRequestStarted() {
  return { type: LOGOUT_REQUEST_STARTED };
}

function logoutRequestSuccess() {
  return { type: LOGOUT_REQUEST_SUCCESS, user: null };
}

function logoutRequestFailed(error) {
  return { type: LOGOUT_REQUEST_FAILED, error };
}
