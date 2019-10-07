import { APIURLs, AppAxios } from '../../Config/APIConfig';
import { cloneDeep as _cloneDeep, findIndex as _findIndex } from 'lodash';

import {
  ADD_ADDRESS_STARTED,
  ADD_ADDRESS_SUCCESS,
  ADD_ADDRESS_FAILED,
  REMOVE_ADDRESS_STARTED,
  REMOVE_ADDRESS_SUCCESS,
  REMOVE_ADDRESS_FAILED,
  CHANGE_ADDRESS_STARTED,
  CHANGE_ADDRESS_SUCCESS,
  CHANGE_ADDRESS_FAILED,
  GET_USER_INFO_STARTED,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_FAILED,
  SELECT_SHIPPING_ADDRESS
} from './ActionTypes';

const ADDRESS_API_ACTIONS = {
  add: 'ADD_ADDRESS',
  remove: 'DELETE_ADDRESS',
  change: 'CHANGE_ADDRESS'
};

export function getUserInfo(user) {
  return async (dispatch, getState) => {
    dispatch(getUserInfoStarted());

    try {
      const response = await AppAxios.get(APIURLs.userData, {
        headers: {
          'Authorization': `bearer ${user.token}`
        }
      });
      const { user: userData = {} } = response.data;
      const { addresses, ...userInfo } = userData;

      dispatch(getUserInfoSuccess(userInfo, addresses));

      // Reset Selected Address if the address no longer available
      const { user: userReducer } = getState();

      if (_findIndex(addresses, address =>
          address._id === userReducer.lastSelectedAddress) === -1) {
        dispatch(selectShippingAddress(undefined));
      }
    } catch (error) {
      dispatch(getUserInfoFailed(error));
    }
  };
}

export function addAddress(user, address) {
  return async dispatch => {
    dispatch(addUserAddressStarted());

    try {
      const response = await updateUserAddress(ADDRESS_API_ACTIONS.add, [address], user);
      dispatch(addUserAddressSuccess(response.data.addresses));
    } catch (error) {
      dispatch(addUserAddressFailed(error));
    }
  };
}

export function removeAddress(user, addressId) {
  return async (dispatch, getState) => {
    dispatch(removeUserAddressStarted());

    try {
      const response = await updateUserAddress(ADDRESS_API_ACTIONS.remove, [{ addressId }], user);

      dispatch(removeUserAddressSuccess(response.data.addresses));

      const { user: userReducer } = getState();

      // Reset Selected Address if the address no longer available
      if (addressId === userReducer.lastSelectedAddress) {
        dispatch(selectShippingAddress(undefined));
      }
    } catch (error) {
      dispatch(removeUserAddressFailed(error));
    }
  };
}

export function changeAddress(user, address) {
  return async dispatch => {
    dispatch(changeUserAddressStarted());

    try {
      const response = await updateUserAddress(ADDRESS_API_ACTIONS.change, [address], user);

      dispatch(changeUserAddressSuccess(response.data.addresses));
    } catch (error) {
      dispatch(changeUserAddressFailed(error));
    }
  };
}

export function selectShippingAddress(addressId) {
  return { type: SELECT_SHIPPING_ADDRESS, addressId };
}

function updateUserAddress(action, updates, user) {
  const reqBody = {
      action,
      updates
  };

  return AppAxios.patch(APIURLs.updateAddress, reqBody, {
      headers: {
          'Authorization': `bearer ${user.token}`
      }
  });
}

function addUserAddressStarted() {
  return { type: ADD_ADDRESS_STARTED };
}

function addUserAddressSuccess(addresses) {
  return { type: ADD_ADDRESS_SUCCESS, addresses: _cloneDeep(addresses) };
}


function addUserAddressFailed(error) {
  return { type: ADD_ADDRESS_FAILED, error };
}

function removeUserAddressStarted() {
  return { type: REMOVE_ADDRESS_STARTED };
}

function removeUserAddressSuccess(addresses) {
  return { type: REMOVE_ADDRESS_SUCCESS, addresses: _cloneDeep(addresses) };
}


function removeUserAddressFailed(error) {
  return { type: REMOVE_ADDRESS_FAILED, error };
}

function changeUserAddressStarted() {
  return { type: CHANGE_ADDRESS_STARTED };
}

function changeUserAddressSuccess(addresses) {
  return { type: CHANGE_ADDRESS_SUCCESS, addresses: _cloneDeep(addresses) };
}


function changeUserAddressFailed(error) {
  return { type: CHANGE_ADDRESS_FAILED, error };
}

function getUserInfoStarted() {
  return { type: GET_USER_INFO_STARTED };
}

function getUserInfoSuccess(userInfo, addresses) {
  return { type: GET_USER_INFO_SUCCESS, user: userInfo, addresses: _cloneDeep(addresses) };
}

function getUserInfoFailed(error) {
  return { type: GET_USER_INFO_FAILED, error };
}
