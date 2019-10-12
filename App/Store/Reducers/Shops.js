import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    cities: null,
    searchAreasError: null,
    isLoading: false,
    shops: null,
    error: null,
    currentSearchCity: undefined,
    currentSearchArea: undefined,
    currentSearchDistrict: undefined,
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.GET_SEARCH_AREAS_SUCCESS:
            return { ...state, cities: action.cities, searchAreasError: null };

        case ActionTypes.GET_SEARCH_AREAS_FAILED:
            return { ...state, cities: null, searchAreasError: action.error };

        case ActionTypes.GET_SHOPS_REQUEST_STARTED:
            return {
                ...state,
                isLoading: true,
                currentSearchCity: action.city,
                currentSearchArea: action.area,
                currentSearchDistrict: action.district
            };

        case ActionTypes.GET_SHOPS_REQUEST_SUCCESS:
            return { ...state, isLoading: false, shops: action.shops };

        case ActionTypes.GET_SHOPS_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

        default: 
            return state;
    }
}
