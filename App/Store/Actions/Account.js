import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { isFunction as _isFunction, get as _get } from 'lodash';
import Toast from 'react-native-root-toast';

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
  REFRESH_TOKEN_FAILED,
  GENERATE_RESET_PASSWORD_CODE_FAILED,
  GENERATE_RESET_PASSWORD_CODE_STARTED,
  GENERATE_RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  SET_REFRESH_TOKEN,
  REMOVE_TOKEN
} from './ActionTypes';

import { APIURLs, AppAxios } from './../../Config/APIConfig';

export const login = (phone, password) => {
  return async (dispatch) => {
    try {
      dispatch(loginRequestStarted());
      const response = await AppAxios.post(APIURLs.login, { phone, password });
      dispatch(loginRequestSuccess(response.data));
    } catch (error) {
      dispatch(loginRequestFailed(error.response));
    }
  };
};

export const register = (firstName, lastName, email, password, phone, birthDate, gender) => {
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
        userRole: 'user',
        birthDate,
        gender
      });
      dispatch(registerRequestSuccess(response.data));
      // Actions.verificationCode();
    } catch (error) {
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

      dispatch(sendVerificationCodeSuccess());
    } catch (error) {
      dispatch(sendVerificationCodeFailed(error));
    }
  }
};

export const verifyCode = (code, user = {}, onVerify) => {
  return async dispatch => {
    dispatch(verifyCodeStarted());

    try {
      const response = await AppAxios.post(APIURLs.verifyCode, { pinCode: code }, {
        headers: {
          'Authorization': `bearer ${(user || {}).token}`
        }
      });

      if (_isFunction(onVerify)) {
        dispatch(verifyCodeResetCodeSuccess());
        onVerify();
      } else {
        dispatch(verifyCodeCodeSuccess());
      }
    } catch (error) {
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

      const { message, ...userData } = response.data;
      dispatch(refreshTokenSuccess({ ...user, ...userData }));
    } catch (error) {
      dispatch(refreshTokenFailed(error));
    } 
  };
};

export const forgotPassword = (phone, shouldNavigate = true) => {
  return async dispatch => {
    dispatch(generateResetPasswordStarted());

    try {
      const response = await AppAxios.post(APIURLs.forgotPassword, { phone });
      dispatch(generateResetPasswordSuccess(response.data.token));

      if (shouldNavigate) {
        Actions.forgotPasswordVerificationCode({ phone });
      }
    } catch (error) {
      dispatch(generateResetPasswordFailed(error));
    }
  };
};

export const resetPassword = (oldPassword, newPassword, user, onReset) => {
  return async dispatch => {
    dispatch(resetPasswordStarted());

    try {
      const response = await AppAxios.patch(APIURLs.resetPassword, { oldPassword, newPassword }, {
        headers: {
          'Authorization': `bearer ${user.token}`
        }
      });
      dispatch(resetPasswordSuccess(response.data));
      
      const message = 'Password Changed Successfully';
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });

      if (_isFunction(onReset)) {
        onReset();
      }
    } catch (error) {
      // console.tron.error(error);

      if (error.response) {
        const message = _get(error.response, 'data.message', 'Something went wrong');
        Toast.show(message, {
          position: Toast.positions.BOTTOM,
          duration: Toast.durations.SHORT,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        dispatch(resetPasswordFailed(error.response));
      } else {
        dispatch(resetPasswordFailed(error));
      }
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

function verifyCodeResetCodeSuccess() {
  return { type: RESET_PASSWORD_CODE_SUCCESS };
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

export function setRefreshToken(user) {
  return { type: SET_REFRESH_TOKEN, user, time: moment(new Date()) };
}

export function removeToken() {
  return { type: REMOVE_TOKEN };
}

function refreshTokenFailed(error) {
  return { type: REFRESH_TOKEN_FAILED, error };
}

function generateResetPasswordStarted() {
  return { type: GENERATE_RESET_PASSWORD_CODE_STARTED };
}

function generateResetPasswordSuccess(token) {
  return { type: GENERATE_RESET_PASSWORD_CODE_SUCCESS, user: { token } };
}

function generateResetPasswordFailed(error) {
  return { type: GENERATE_RESET_PASSWORD_CODE_FAILED, error };
}

function resetPasswordStarted() {
  return { type: RESET_PASSWORD_STARTED };
}

function resetPasswordSuccess(user) {
  return { type: RESET_PASSWORD_SUCCESS, user, time: new Date() };
}

function resetPasswordFailed(error) {
  return { type: RESET_PASSWORD_FAILED, error };
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
