import * as ActionTypes from './ActionTypes';

export function deviceDimensionsChanged(dimensions) {
  return {
    type: ActionTypes.DEVICE_DIMENSIONS_CHANGED,
    dimensions,
  };
}
