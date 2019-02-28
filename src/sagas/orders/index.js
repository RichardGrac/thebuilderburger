import {put} from 'redux-saga/effects'
import axios from '../../axios/orders'
import {purchaseBurgerFail, purchaseBurgerSuccess} from '../../redux/orders/actions/orders'

export function* purchaseBurgerStartSaga(action) {
    try {
        const response = yield axios.post('/orders.json?auth=' + action.tokenId, action.orderData)
        yield put(purchaseBurgerSuccess(response.data, action.orderData))
    } catch(error) {
        yield put(purchaseBurgerFail())
    }
}

export function* fetchOrdersSaga(action) {
    const query = `?auth=${action.tokenId}&orderBy="userId"&equalTo="${action.userId}"`
    try {
        const response = yield axios.get('orders.json' + query)
        yield put({
            type: 'FETCH_ORDERS',
            orders: response.data
        })
    } catch (error) {
        console.error('Error fetching orders: ', error)
    }
}