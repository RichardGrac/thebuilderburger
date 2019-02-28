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
    return {
        type: 'PURCHASE_B_START',
        orderData,
        tokenId
    }
}

export const resetBurgerPurchase = () => {
    return {
        type: 'RESET_BURGER_PURCHASE'
    }
}

export const fetchOrders = (tokenId, userId) => {
    return {
        type: 'FETCH_ORDERS_SAGA',
        tokenId,
        userId
    }
}