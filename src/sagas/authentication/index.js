import { put, delay } from 'redux-saga/effects'
import {postHttpRequest} from '../../fetch/fetch'
import {authFail, authSuccess, checkAuthTimeout, logout} from '../../redux/Authentication/actions/auth'
const SIGN_UP_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB54zUr25-2PIxnPZBdM9I4XCNOAwx8aQg'
const SIGN_IN_ENDPOINT = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB54zUr25-2PIxnPZBdM9I4XCNOAwx8aQg'

export function* logoutSaga() {
    yield localStorage.clear()
    yield put({ type: 'LOG_OUT' })
}

export function* authSuccessSaga(action) {
    let {authData, redirectTo} = action
    yield localStorage.setItem('tokenId', authData.idToken)
    yield localStorage.setItem('expirationDate', new Date(new Date().getTime() + authData.expiresIn * 1000).toString())
    yield localStorage.setItem('userId', authData.localId)
    yield put({
        type: 'AUTH_SUCCESS',
        authData,
        redirectTo
    })
}

export function* checkTimeout(action) {
    yield delay(action.expirationTime * 1000)
    yield put({ type: 'INITIATE_LOG_OUT' })
}

export function* authSaga(action) {
    const url = action.isSignIn ? SIGN_IN_ENDPOINT : SIGN_UP_ENDPOINT
    try {
        let response = yield postHttpRequest(url, {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        })
        yield put(authSuccess(response, action.redirectTo))
        yield put(checkAuthTimeout(response.expiresIn))
    } catch (e) {
        let error = yield e.json()
        yield put(authFail(error.error))
    }
}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('tokenId')
    if (!token) {
        yield put(logout())
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'))
        if (expirationDate > new Date()){
            const userId = yield localStorage.getItem('userId')
            const expiresIn = (expirationDate.getTime() - new Date().getTime()) / 1000
            yield put(authSuccess({idToken: token, localId: userId, expiresIn}))
            yield put(checkAuthTimeout(expiresIn))
        } else {
            yield put(logout())
        }
    }
}