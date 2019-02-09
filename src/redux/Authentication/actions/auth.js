import {postHttpRequest} from '../../../fetch/fetch'
import {HOME_URL} from '../../../utilities/constants'
const SIGN_UP_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB54zUr25-2PIxnPZBdM9I4XCNOAwx8aQg'
const SIGN_IN_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB54zUr25-2PIxnPZBdM9I4XCNOAwx8aQg'

export const authStart = () => {
    return {
        type: 'AUTH_START'
    }
}

export const authSuccess = (authData, redirectTo = HOME_URL) => {
    localStorage.setItem('tokenId', authData.idToken)
    localStorage.setItem('expirationDate', new Date(new Date().getTime() + authData.expiresIn * 1000).toString())
    localStorage.setItem('userId', authData.localId)
    return {
        type: 'AUTH_SUCCESS',
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
    const url = isSignIn ? SIGN_IN_ENDPOINT : SIGN_UP_ENDPOINT
    return async dispatch => {
        try {
            let response = await postHttpRequest(url, {
                email: email,
                password: password,
                returnSecureToken: true
            })
            dispatch(authSuccess(response, redirectTo))
            dispatch(checkAuthTimeout(response.expiresIn))
        } catch (e) {
            let error = await e.json()
            dispatch(authFail(error.error))
        }

    }
}

export const cleanAuthError = () => {
    return {
        type: 'CLEAN_AUTH_ERROR'
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.clear()
    return {
        type: 'LOG_OUT'
    }
}

export const cleanRedirect = () => {
    return { type: 'CLEAN_REDIRECT' }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('tokenId')
        if (!token) {
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate > new Date()){
                const userId = localStorage.getItem('userId')
                const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000
                dispatch(authSuccess({idToken: token, localId: userId, expiresIn}))
                dispatch(checkAuthTimeout(expiresIn))
            } else {
                dispatch(logout())
            }
        }
    }
}