import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
  isGettingUserInfo: false,
  userInfo: null,
  gettingUserInfoFailed: null,
  addresses: null,
  isAddingAddress: false,
  addAddressError: null,
  isRemovingAddress: false,
  removeAddressError: null,
  isChangingAddress: false,
  changeAddressError: null,
  lastSelectedAddress: undefined
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case ActionTypes.GET_USER_INFO_STARTED:
      return { ...state, isGettingUserInfo: true, gettingUserInfoFailed: null };

    case ActionTypes.GET_USER_INFO_SUCCESS:
      return { ...state, isGettingUserInfo: false, userInfo: action.user, addresses: action.addresses };

    case ActionTypes.GET_USER_INFO_FAILED:
      return { ...state, isGettingUserInfo: false, gettingUserInfoFailed: action.error };

    case ActionTypes.ADD_ADDRESS_STARTED:
      return { ...state, isAddingAddress: true, addAddressError: null };

    case ActionTypes.ADD_ADDRESS_SUCCESS:
      return { ...state, isAddingAddress: false, addresses: action.addresses };

    case ActionTypes.ADD_ADDRESS_FAILED:
      return { ...state, isAddingAddress: false, addAddressError: action.error };

    case ActionTypes.REMOVE_ADDRESS_STARTED:
      return { ...state, isRemovingAddress: true, removeAddressError: null };

    case ActionTypes.REMOVE_ADDRESS_SUCCESS:
      return { ...state, isRemovingAddress: false, addresses: action.addresses };

    case ActionTypes.REMOVE_ADDRESS_FAILED:
      return { ...state, isRemovingAddress: false, removeAddressError: action.error };

    case ActionTypes.CHANGE_ADDRESS_STARTED:
      return { ...state, isChangingAddress: true, changeAddressError: null };

    case ActionTypes.CHANGE_ADDRESS_SUCCESS:
      return { ...state, isChangingAddress: false, addresses: action.addresses };

    case ActionTypes.CHANGE_ADDRESS_FAILED:
      return { ...state, isChangingAddress: false, changeAddressError: action.error };

    case ActionTypes.SELECT_SHIPPING_ADDRESS:
      return { ...state, lastSelectedAddress: action.addressId };

    case ActionTypes.LOGOUT_REQUEST_SUCCESS:
      return { ...state, lastSelectedAddress: undefined, userInfo: null, addresses: null };

    default:
      return { ...state };
  }
}
