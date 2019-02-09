import axios from '../../../axios/orders'

export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: 'PURCHASE_BURGER_SUCCESS',
        orderId,
        orderData
    }
}

export const purchaseBurgerFail = () => {
    return {
        type: 'PURCHASE_BURGER_FAIL'
    }
}

export const purchaseBurgerStart = (orderData, tokenId) => {
    return dispatch => {
        axios.post('/orders.json?auth=' + tokenId, orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data, orderData))
            })
        .catch(error => {
            dispatch(purchaseBurgerFail())
        })
    }
}

export const resetBurgerPurchase = () => {
    return {
        type: 'RESET_BURGER_PURCHASE'
    }
}

export const fetchOrders = (tokenId, userId) => {
    return dispatch => {
        const query = `?auth=${tokenId}&orderBy="userId"&equalTo="${userId}"`
        axios.get('orders.json' + query)
            .then(response => {
                dispatch({
                    type: 'FETCH_ORDERS',
                    orders: response.data
                })
            })
            .catch(e => {
                console.error('Error fetching orders: ', e)
            })
    }
}