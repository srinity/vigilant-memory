import { APIURLs, AppAxios } from './../../Config/APIConfig';

import {
    GET_SHOPS_REQUEST_STARTED,
    GET_SHOPS_REQUEST_FAILED,
    GET_SHOPS_REQUEST_SUCCESS,
    GET_SEARCH_AREAS_SUCCESS,
    GET_SEARCH_AREAS_FAILED
} from './ActionTypes';

export const getSearchAreas = () => {
  return async dispatch => {
    try {
      console.tron.error('hereeeeeee')
      const response = await AppAxios.get(APIURLs.searchAreas);
      console.tron.warn(response)
      dispatch(getSearchAreasSuccess(response.data.cities));
    } catch (error) {
      console.tron.log(error)
      dispatch(getSearchAreasFailed(error));
    }
  };
};

export const getShops = (city, area, district) => {
    return async (dispatch) => {
        dispatch(getShopsStarted());
        try {
          const response = await AppAxios.get(APIURLs.getShops, {
            params: {
              city,
              area,
              district
            }
          });

          dispatch(getShopsSuccess(response.data.shops));
        } catch (error) {
          dispatch(getShopsFailed(error));
        }
    };
};

function getSearchAreasSuccess(cities) {
  return { type: GET_SEARCH_AREAS_SUCCESS, cities };
}

function getSearchAreasFailed(error) {
  return { type: GET_SEARCH_AREAS_FAILED, error };
}

function getShopsStarted() {
    return { type: GET_SHOPS_REQUEST_STARTED };
}

function getShopsSuccess(shops) {
    return { type: GET_SHOPS_REQUEST_SUCCESS, shops };
}

function getShopsFailed(error) {
    return { type: GET_SHOPS_REQUEST_FAILED, error };
}
