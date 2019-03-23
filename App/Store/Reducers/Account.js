import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    isLoading: false,
    user: null,
    error: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST_STARTED:
            return { ...state, isLoading: true, error: null };

        case ActionTypes.LOGIN_REQUEST_SUCCESS:
            return { ...state, isLoading: false, user: action.user, error: null };

        case ActionTypes.LOGIN_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

        case ActionTypes.REGISTER_REQUEST_STARTED:
            return { ...state, isLoading: true, error: null };

        case ActionTypes.REGISTER_REQUEST_SUCCESS:
            return { ...state, isLoading: false, user: action.user, error: null };

        case ActionTypes.REGISTER_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

            case ActionTypes.LOGOUT_REQUEST_STARTED:
            return { ...state, isLoading: true, error: null };

        case ActionTypes.LOGOUT_REQUEST_SUCCESS:
            return { ...state, isLoading: false, user: action.user, error: null };

        case ActionTypes.LOGOUT_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

        default:
            return { ...state };
    }
}
