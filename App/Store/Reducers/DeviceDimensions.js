import { ActionTypes } from './../Actions';

const initialState = {
    width: null,
    height: null,
    orientation: 'PORTRAIT',
    deviceType: 'MOBILE'
};

export default function (state = initialState, action = {}) {
  switch (action.type) {
    case ActionTypes.DEVICE_DIMENSIONS_CHANGED:
      return { ...action.dimensions };

    default:
      return { ...state };
  }
}
