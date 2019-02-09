import axios from '../../../axios/orders'

export const onFetchInitialIngredients = () => {
    return dispatch => {
        axios.get('ingredients.json')
            .then(response => {
                dispatch({
                    type: 'SET_INITIAL_INGREDIENTS',
                    ingredients: response.data,
                    totalPrice: 4
                })
            })
            .catch(() => {
                dispatch({
                    type: 'ERROR_FETCHING_INGREDIENTS'
                })
            })
    }
}

export const onAddIngredient = (ingredient, newTotalPrice) => {
    return {
        type: 'ADD_INGREDIENT',
        payload: {
            ingredient,
            newTotalPrice
        }
    }
}

export const onRemoveIngredient = (ingredient, newTotalPrice) => {
    return {
        type: 'REMOVE_INGREDIENT',
        payload: {
            ingredient,
            newTotalPrice
        }
    }
}

export const onSaveIngredients = (ingredients, totalPrice) => {
    return {
        type: 'SAVE_INGREDIENTS',
        payload: {
            ingredients,
            totalPrice
        }
    }
}