import {HOME_URL} from '../../../utilities/constants'

const initialState = {
    authError: null,
    tokenId: null,
    userId: null,
    loading: false,
    redirectTo: HOME_URL
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                loading: true,
                authError: null
            }

        case 'AUTH_SUCCESS':
            return {
                ...state,
                authError: null,
                tokenId: action.authData.idToken,
                userId: action.authData.localId,
                loading: false,
                redirectTo: action.redirectTo
            }

        case 'AUTH_FAIL':
            return {
                ...state,
                authError: action.error,
                loading: false
            }

        case 'CLEAN_AUTH_ERROR':
            return {
                ...state,
                authError: null
            }

        case 'LOG_OUT':
            return {
                ...state,
                tokenId: null,
                userId: null
            }

        case 'CLEAN_REDIRECT':
            return {
                ...state,
                redirectTo: HOME_URL
            }

        default:
            return { ...state }
    }
}