import {combineReducers} from 'redux'

import ingredientsReducer from './ingredients/reducers/ingredients'
import ordersReducer from './orders/reducers/orders'
import {authReducer} from './Authentication/reducers/auth'

export const rootReducer = combineReducers({
    ingredientsReducer,
    ordersReducer,
    authReducer
})