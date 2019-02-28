export const onFetchInitialIngredients = () => {
    return { type: 'SET_INITIAL_ING' }
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