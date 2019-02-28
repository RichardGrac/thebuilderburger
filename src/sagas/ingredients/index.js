import axios from '../../axios/orders'
import {put} from 'redux-saga/effects'

export function* onFetchInitialIng() {
    try {
        const response = yield axios.get('ingredients.json')
        yield put({
            type: 'SET_INITIAL_INGREDIENTS',
            ingredients: response.data,
            totalPrice: 4
        })
    } catch (e) {
        yield put({
            type: 'ERROR_FETCHING_INGREDIENTS'
        })
    }
}