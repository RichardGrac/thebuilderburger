const initialState = {
    purchaseSuccess: false,
    purchaseFail: false,
    errorMessage: '',
    orders: null
}

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PURCHASE_BURGER_SUCCESS':
            return {
                ...state,
                purchaseSuccess: true,
                purchaseFail: false
            }

        case 'PURCHASE_BURGER_FAIL':
            return {
                ...state,
                purchaseFail: true,
                purchaseSuccess: false
            }

        case 'RESET_BURGER_PURCHASE':
            return {
                state: {...initialState}
            }

        case 'FETCH_ORDERS':
            return {
                ...state,
                orders: action.orders
            }

        default:
            return {...state}

    }
}

export default ordersReducer