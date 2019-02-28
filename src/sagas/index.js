import { takeEvery } from 'redux-saga/effects'

import {
    authCheckStateSaga,
    authSaga, authSuccessSaga,
    checkTimeout,
    logoutSaga
} from './authentication'
import {onFetchInitialIng} from './ingredients'
import {fetchOrdersSaga, purchaseBurgerStartSaga} from './orders'

export function* watchAuth() {
    yield takeEvery('INITIATE_LOG_OUT', logoutSaga)
    yield takeEvery('CHECK_AUTH_TIMEOUT', checkTimeout)
    yield takeEvery('AUTH_USER', authSaga)
    yield takeEvery('AUTH_CHECK_STATE', authCheckStateSaga)
    yield takeEvery('AUTH_SUCCESS_SAGA', authSuccessSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery('SET_INITIAL_ING', onFetchInitialIng)
}

export function* watchOrders() {
    yield takeEvery('PURCHASE_B_START', purchaseBurgerStartSaga)
    yield takeEvery('FETCH_ORDERS_SAGA', fetchOrdersSaga)
}