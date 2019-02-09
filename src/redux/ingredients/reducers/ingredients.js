const initialState = {
    ingredients: {
        salad: 0,
        meat: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 4,
    error: false,
    alreadySetInitialState: false
}

const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INITIAL_INGREDIENTS':
            return {
                ...state,
                ingredients: action.ingredients,
                alreadySetInitialState: true,
                error: false,
                totalPrice: action.totalPrice
            }

        case 'ERROR_FETCHING_INGREDIENTS':
            return {
                ...state,
                error: true
            }

        case 'ADD_INGREDIENT':
            const ing = action.payload.ingredient
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ing]: state.ingredients[ing] + 1
                },
                totalPrice: action.payload.newTotalPrice
            }

        case 'REMOVE_INGREDIENT':
            const ingr = action.payload.ingredient
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [ingr]: state.ingredients[ingr] - 1
                },
                totalPrice: action.payload.newTotalPrice
            }

        case 'SAVE_INGREDIENTS':
            return {
                ...state,
                ingredients: Object.assign({}, action.payload.ingredients),
                totalPrice: action.payload.totalPrice
            }

        case 'GET_INGREDIENTS':
            return {...state}

        default:
            return {...state}
    }
}

export default ingredientsReducer