import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    isLoading: false,
    user: null,
    error: null,
    isVerifyingCode: false,
    isSendingVerificationCode: false,
    verifyingCodeError: null,
    sendingVerificationCodeError: null
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

        case ActionTypes.SENDING_VERIFICATION_CODE_STARTED:
            return { ...state, isSendingVerificationCode: true, sendingVerificationCodeError: null };

        case ActionTypes.SENDING_VERIFICATION_CODE_SUCCESS:
            return { ...state, isSendingVerificationCode: false, sendingVerificationCodeError: null };

        case ActionTypes.SENDING_VERIFICATION_CODE_FAILED:
                return { ...state, isSendingVerificationCode: false, sendingVerificationCodeError: action.error };

        case ActionTypes.VERIFYING_USER_CODE_STARTED:
            return { ...state, isVerifyingCode: true, verifyingCodeError: null };

        case ActionTypes.VERIFYING_USER_CODE_SUCCESS:
                return { ...state, isVerifyingCode: false, verifyingCodeError: null };

        case ActionTypes.VERIFYING_USER_CODE_FAILED:
            return { ...state, isVerifyingCode: false, verifyingCodeError: action.error };

        default:
            return { ...state };
    }
}
