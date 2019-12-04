import { ActionTypes } from '../Actions';

const INITIAL_STATE = {
    phone: undefined,
    isLoggedIn: false,
    isLoading: false,
    user: null,
    error: null,
    isVerifyingCode: false,
    isSendingVerificationCode: false,
    verifyingCodeError: null,
    sendingVerificationCodeError: null,
    isGeneratingResetPassword: false,
    generateResetPasswordError: null,
    refreshTokenStarted: false,
    refreshTokenError: null,
    lastLoginTime: undefined,
    isResettingPassword: false,
    resetPasswordError: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST_STARTED:
            return { ...state, isLoading: true, error: null };

        case ActionTypes.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: null,
                isLoggedIn: true,
                lastLoginTime: action.time,
                phone: action.phone
            };

        case ActionTypes.LOGIN_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

        case ActionTypes.REGISTER_REQUEST_STARTED:
            return { ...state, isLoading: true, error: null };

        case ActionTypes.REGISTER_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: null,
                isLoggedIn: true,
                lastLoginTime: action.time,
                phone: action.phone
            };

        case ActionTypes.REGISTER_REQUEST_FAILED:
            return { ...state, isLoading: false, error: action.error };

            case ActionTypes.LOGOUT_REQUEST_STARTED:
            return { ...state, isLoading: true, error: null };

        case ActionTypes.LOGOUT_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                user: action.user,
                error: null,
                isLoggedIn: false
            };

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
                return {
                    ...state,
                    isVerifyingCode: false,
                    verifyingCodeError: null,
                    user: { ...state.user, inActive: false }
                };

        case ActionTypes.RESET_PASSWORD_CODE_SUCCESS:
                return {
                    ...state,
                    isVerifyingCode: false,
                    verifyingCodeError: null,
                    user: action.user
                };

        case ActionTypes.VERIFYING_USER_CODE_FAILED:
            return { ...state, isVerifyingCode: false, verifyingCodeError: action.error };

        case ActionTypes.REFRESH_TOKEN_STARTED:
            return { ...state, refreshTokenStarted: true, refreshTokenError: null };

        case ActionTypes.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                refreshTokenStarted: false,
                user: action.user,
                lastLoginTime: action.time
            };

        case ActionTypes.SET_REFRESH_TOKEN:
            return {
                ...state,
                user: { ...state.user, ...action.user },
                lastLoginTime: action.time
            };

        case ActionTypes.REMOVE_TOKEN:
            return {
                ...state,
                user: null,
                isLoggedIn: false
            };

        case ActionTypes.REFRESH_TOKEN_FAILED:
            return {
                ...state,
                refreshTokenStarted: false,
                refreshTokenError: action.error,
                user: null,
                isLoggedIn: false
            };

        case ActionTypes.GENERATE_RESET_PASSWORD_CODE_STARTED:
            return { ...state, isGeneratingResetPassword: true, generateResetPasswordError: null };
        
        case ActionTypes.GENERATE_RESET_PASSWORD_CODE_SUCCESS:
            return { ...state, isGeneratingResetPassword: false, user: { ...state.user, ...action.user } };

        case ActionTypes.GENERATE_RESET_PASSWORD_CODE_FAILED:
            return { ...state, isGeneratingResetPassword: false, generateResetPasswordError: action.error };

        case ActionTypes.RESET_PASSWORD_STARTED:
            return { ...state, isResettingPassword: true, resetPasswordError: null };

        case ActionTypes.RESET_PASSWORD_SUCCESS:
                return {
                    ...state,
                    isResettingPassword: false,
                    user: { ...state.user, ...action.user },
                    isLoggedIn: true,
                    lastLoginTime: action.time
                };

        case ActionTypes.RESET_PASSWORD_FAILED:
                return { ...state, isResettingPassword: false, resetPasswordError: action.error };

        default:
            return { ...state };
    }
}
