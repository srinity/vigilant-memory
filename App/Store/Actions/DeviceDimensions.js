import * as ActionTypes from './ActionTypes';

/**
 * @param  {object} dimensions
 */
export function deviceDimensionsChanged(dimensions) {
  // dispatch an action with the device dimensions
  return {
    type: ActionTypes.DEVICE_DIMENSIONS_CHANGED,
    dimensions,
  };
}
