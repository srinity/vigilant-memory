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

/**
 * @param  {string} phone the user's phone number used for login
 * @param  {string} password the user's password used for login
 */
export const login = (phone, password) => {
  // return a function that will be handled by the thunk middleware to dispatch multiple actions
  return async (dispatch) => {
    try {
      // Dispatching that the login attempt has started, this will reset any error messages
      // in the reducer and also set the isLoading flag to be true
      dispatch(loginRequestStarted());
      // Start the Api call for the login with the user's entered phone and password
      const response = await AppAxios.post(APIURLs.login, { phone, password });
      // Dispatch an action with the user returned from api to be stored in the reducer with the user's token
      // We also now save the phone used for login in case verifying the code was not done immediately,
      // we can use the phone to verify the code along with the pin number sent 
      dispatch(loginRequestSuccess(response.data, phone));
    } catch (error) {
      // Get the error message returned from the api
      const message = _get(error.response, 'data.message', 'Something went wrong');
      // Display that message in a Toast for the use to see
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      // Dispatch an action with error returned from the api to be handled by the UI
      dispatch(loginRequestFailed(error.response));
    }
  };
};

/**
 * @param  {string} firstName the user's first name
 * @param  {string} lastName the user's last name
 * @param  {string} password the user's password
 * @param  {string} phone the user's phone number
 * @param  {Date} birthDate the user's birth date
 * @param  {('M' | 'F')} gender the user's gender
 */
export const register = (firstName, lastName, password, phone, birthDate, gender) => {
  // return a function that will be handled by the thunk middleware to dispatch multiple actions
  return async (dispatch) => {
    try {
      // Dispatching that the register attempt has started, this will reset any error messages
      // in the reducer and also set the isLoading flag to be true
      dispatch(registerRequestStarted());

      // Start the Api call for the register with the user's data provided
      const response = await AppAxios.post(APIURLs.register, {
        fullName: {
          firstName,
          lastName
        },
        password,
        phone,
        userRole: 'user',
        birthDate,
        gender
      });

      // Dispatch an action with the user returned from api to be stored in the reducer with the user's token
      // We also now save the phone used for register in case verifying the code was not done immediately,
      // we can use the phone to verify the code along with the pin number sent 
      dispatch(registerRequestSuccess(response.data, phone));
      // Actions.verificationCode();
    } catch (error) {
      // Get the error message returned from the api
      const message = _get(error.response, 'data.message', 'Something went wrong');
      // Display that message in a Toast for the use to see
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      // Dispatch an action with error returned from the api to be handled by the UI
      dispatch(registerRequestFailed(error.response));
    }
  };
};

/**
 * @param  {{ token: string }} user the user currently logged in
 */
export const sendVerificationCode = (user) => {
  // return a function that will be handled by the thunk middleware to dispatch multiple actions
  return async dispatch => {
    // Dispatch an action indicating that sending the verification code has started
    dispatch(sendVerificationCodeStarted());

    try {
      // Call the Api to attempt to send code to the user's mobile number
      const response = await AppAxios.get(APIURLs.sendCode, {
        headers: {
          'Authorization': `bearer ${user.token}`
        } 
      });

      // Upon success we dispatch the action to notify that we have successfully sent the code
      dispatch(sendVerificationCodeSuccess());
    } catch (error) {
      // Get the error message returned from the api
      const message = _get(error.response, 'data.message', 'Something went wrong');
      // Display that message in a Toast for the use to see
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      // console.tron.error(error)
      // Dispatch an action with error returned from the api to be handled by the UI
      dispatch(sendVerificationCodeFailed(error));
    }
  };
};
/**
 * @param  {string} code The code that was sent to the phone
 * @param  {{ token: string }} user={} The user that is currently logged in
 * @param  {Function} onVerify Optional method that will be invoked upon successfully verifying the code
 * @param  {string} phone The user's phone number
 */
export const verifyCode = (code, user = {}, onVerify, phone) => {
  return async dispatch => {
    // Dispatch an action indicating that the verification action has started
    dispatch(verifyCodeStarted());

    try {
      const response = await AppAxios.post(APIURLs.verifyCode, { pinCode: code, phone }, {
        headers: {
          'Authorization': `bearer ${(user || {}).token}`
        }
      });

      // Dispatch success actions based on wether or not a function is passed as a parameter
      if (_isFunction(onVerify)) {
        dispatch(verifyCodeResetCodeSuccess(response.data.token));
        onVerify();
      } else {
        dispatch(verifyCodeCodeSuccess());
      }
    } catch (error) {
      // Get the error message returned from the api
      const message = _get(error.response, 'data.message', 'Something went wrong');
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      // Dispatch an action with error returned from the api to be handled by the UI
      dispatch(verifyCodeCodeFailed(error));
    }
  };
};

/**
 * @param  {{ token: string }} user the current user logged in
 */
export const refreshToken = (user) => {
  return async dispatch => {
    // Dispatch an action indicating that the refresh token action has started
    dispatch(refreshTokenStarted());

    try {
      const response = await AppAxios.post(APIURLs.refreshToken, undefined, {
        headers: {
          'Authorization': `bearer ${user.token}`
        }
      });

      const { message, ...userData } = response.data;

      // dispatch a success action with the new token
      dispatch(refreshTokenSuccess({ ...user, ...userData }));
    } catch (error) {
      // Get the error message returned from the api
      const message = _get(error.response, 'data.message', 'Something went wrong');
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      // Dispatch an action with error returned from the api to be handled by the UI
      dispatch(refreshTokenFailed(error));
    } 
  };
};

/**
 * @param  {string} phone the phone number you wish to reset the password for
 * @param  {boolean} shouldNavigate=true flag for navigation actions
 */
export const forgotPassword = (phone, shouldNavigate = true) => {
  return async dispatch => {
    // Dispatch an action indicating that the forget password started
    dispatch(generateResetPasswordStarted());

    try {
      const response = await AppAxios.post(APIURLs.forgotPassword, { phone });
      // dispatch(generateResetPasswordSuccess(response.data.token));

      if (shouldNavigate) {
        Actions.forgotPasswordVerificationCode({ userPhone: phone });
      }
    } catch (error) {
      const message = _get(error.response, 'data.message', 'Something went wrong');
      Toast.show(message, {
        position: Toast.positions.BOTTOM,
        duration: Toast.durations.SHORT,
        shadow: true,
        animation: true,
        hideOnPress: true,
      });
      dispatch(generateResetPasswordFailed(error));
    }
  };
};

/**
 * @param  {string} oldPassword
 * @param  {string} newPassword
 * @param  {{ token: string }} user
 * @param  {Function} onReset
 */
export const resetPassword = (oldPassword, newPassword, user, onReset) => {
  return async dispatch => {
    // Dispatch an action indicating that the change password action started
    dispatch(resetPasswordStarted());

    try {
      // console.tron.error(user);
      const response = await AppAxios.patch(APIURLs.resetPassword, { oldPassword, newPassword }, {
        headers: {
          'Authorization': `bearer ${user.token}`
        }
      });
      // console.tron.warn(response);
      // dispatch an action indicating that the password has been changed successfully
      dispatch(resetPasswordSuccess(response.data));

      // show a toast to notify the user that the password has been changed
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

/**
 * remove the current user data
 */
export const logout = () => {
  return dispatch => {
    // dispatch(logoutRequestStarted());
    dispatch(logoutRequestSuccess());
  };
};

function loginRequestStarted() {
  return { type: LOGIN_REQUEST_STARTED };
}

function loginRequestSuccess(user, phone) {
  return { type: LOGIN_REQUEST_SUCCESS, user, time: moment(new Date()), phone };
}

function loginRequestFailed(error) {
  return { type: LOGIN_REQUEST_FAILED, error };
}

function registerRequestStarted() {
  return { type: REGISTER_REQUEST_STARTED };
}

function registerRequestSuccess(user, phone) {
  return { type: REGISTER_REQUEST_SUCCESS, user, time: moment(new Date()), phone };
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

function verifyCodeResetCodeSuccess(token) {
  return { type: RESET_PASSWORD_CODE_SUCCESS, user: { token } };
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
