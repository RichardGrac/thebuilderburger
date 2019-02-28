import {HOME_URL} from '../../../utilities/constants'

export const authStart = () => {
    return { type: 'AUTH_START' }
}

export const authSuccess = (authData, redirectTo = HOME_URL) => {
    return {
        type: 'AUTH_SUCCESS_SAGA',
        authData,
        redirectTo
    }
}

export const authFail = (error) => {
    return {
        type: 'AUTH_FAIL',
        error: error.message
    }
}

export const auth = (email, password, isSignIn, redirectTo) => {
    return {
        type: 'AUTH_USER',
        email,
        password,
        isSignIn,
        redirectTo
    }
}

export const cleanAuthError = () => {
    return {
        type: 'CLEAN_AUTH_ERROR'
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: 'CHECK_AUTH_TIMEOUT',
        expirationTime
    }
}

export const logout = () => {
    return {
        type: 'INITIATE_LOG_OUT'
    }
}

export const cleanRedirect = () => {
    return { type: 'CLEAN_REDIRECT' }
}

export const authCheckState = () => {
    return {
        type: 'AUTH_CHECK_STATE'
    }
}