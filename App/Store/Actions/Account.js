import moment from 'moment';
import { Actions } from 'react-native-router-flux';

import {
  LOGIN_REQUEST_STARTED,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILED,
  REGISTER_REQUEST_STARTED,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAILED,
  LOGOUT_REQUEST_SUCCESS,
  LOGOUT_REQUEST_FAILED,
  LOGOUT_REQUEST_STARTED,
  SENDING_VERIFICATION_CODE_STARTED,
  SENDING_VERIFICATION_CODE_SUCCESS,
  SENDING_VERIFICATION_CODE_FAILED,
  VERIFYING_USER_CODE_STARTED,
  VERIFYING_USER_CODE_SUCCESS,
  VERIFYING_USER_CODE_FAILED,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_STARTED,
  REFRESH_TOKEN_FAILED
} from './ActionTypes';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

export const login = (phone, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequestStarted());
      const response = await AppAxios.post(APIURLs.login, { phone, password });
      console.tron.warn(response.data);
      dispatch(loginRequestSuccess(response.data));
    } catch (error) {
      console.tron.error(error);
      console.tron.error(error.response);
      dispatch(loginRequestFailed(error.response));
    }
  };
};

export const register = (firstName, lastName, email, password, phone, birthDate, gender) => {
  return async (dispatch) => {
    try {
      dispatch(registerRequestStarted());

      console.tron.log(firstName, lastName, email, password, phone, birthDate, gender)
      const response = await AppAxios.post(APIURLs.register, {
        fullName: {
          firstName,
          lastName
        },
        email,
        password,
        phone,
        userRole: 'user',
        birthDate,
        gender
      });
      console.tron.log(response);
      dispatch(registerRequestSuccess(response.data));
      // Actions.verificationCode();
    } catch (error) {
      console.tron.error(error);
      dispatch(registerRequestFailed(error.response));
    }
  };
};

export const sendVerificationCode = (user) => {
  return async dispatch => {
    dispatch(sendVerificationCodeStarted());

    try {
      const response = await AppAxios.get(APIURLs.sendCode, {
        headers: {
          'Authorization': `bearer ${user.token}`
        } 
      });

      console.tron.warn(response);
      dispatch(sendVerificationCodeSuccess());
    } catch (error) {
      console.tron.error(error);
      dispatch(sendVerificationCodeFailed(error));
    }
  }
};

export const verifyCode = (code, user) => {
  return async dispatch => {
    dispatch(verifyCodeStarted())

    try {
      const response = await AppAxios.post(APIURLs.verifyCode, { pinCode: code }, {
        headers: {
          'Authorization': `bearer ${user.token}`
        }
      });

      console.tron.warn(response);
      dispatch(verifyCodeCodeSuccess());
    } catch (error) {
      console.tron.error(error);
      dispatch(verifyCodeCodeFailed(error));
    }
  };
};

export const refreshToken = (user) => {
  return async dispatch => {
    dispatch(refreshTokenStarted());

    try {
      const response = await AppAxios.post(APIURLs.refreshToken, undefined, {
        headers: {
          'Authorization': `bearer ${user.token}`
        }
      });

      console.tron.warn(response.data);
      const { message, ...userData } = response.data;
      dispatch(refreshTokenSuccess({ ...user, ...userData }));
    } catch (error) {
      console.tron.error(error);
      dispatch(refreshTokenFailed(error));
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
  return { type: LOGIN_REQUEST_SUCCESS, user, time: moment(new Date()) };
}

function loginRequestFailed(error) {
  return { type: LOGIN_REQUEST_FAILED, error };
}

function registerRequestStarted() {
  return { type: REGISTER_REQUEST_STARTED };
}

function registerRequestSuccess(user) {
  return { type: REGISTER_REQUEST_SUCCESS, user, time: moment(new Date()) };
}

function registerRequestFailed(error) {
  return { type: REGISTER_REQUEST_FAILED, error };
}

function sendVerificationCodeStarted() {
  return { type: SENDING_VERIFICATION_CODE_STARTED };
}

function sendVerificationCodeSuccess() {
  return { type: SENDING_VERIFICATION_CODE_SUCCESS };
}

function sendVerificationCodeFailed(error) {
  return { type: SENDING_VERIFICATION_CODE_FAILED, error };
}

function verifyCodeStarted() {
  return { type: VERIFYING_USER_CODE_STARTED };
}

function verifyCodeCodeSuccess() {
  return { type: VERIFYING_USER_CODE_SUCCESS };
}

function verifyCodeCodeFailed(error) {
  return { type: VERIFYING_USER_CODE_FAILED, error };
}

function refreshTokenStarted() {
  return { type: REFRESH_TOKEN_STARTED };
}

function refreshTokenSuccess(user) {
  return { type: REFRESH_TOKEN_SUCCESS, user, time: moment(new Date()) };
}

function refreshTokenFailed(error) {
  return { type: REFRESH_TOKEN_FAILED, error };
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
