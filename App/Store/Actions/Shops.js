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
      const response = await AppAxios.get(APIURLs.searchAreas);
      dispatch(getSearchAreasSuccess(response.data.cities));
    } catch (error) {
      dispatch(getSearchAreasFailed(error));
    }
  };
};

export const getShops = (city, area, district) => {
    return async (dispatch) => {
        dispatch(getShopsStarted(city, area, district));
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

function getShopsStarted(city, area, district) {
    return { type: GET_SHOPS_REQUEST_STARTED, city, area, district };
}

function getShopsSuccess(shops) {
    return { type: GET_SHOPS_REQUEST_SUCCESS, shops };
}

function getShopsFailed(error) {
    return { type: GET_SHOPS_REQUEST_FAILED, error };
}
