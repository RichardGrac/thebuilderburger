import React, {useState, useEffect} from 'react';
import Aux from "../../hoc/Auxiliar";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/components/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/components/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler"

import axios from "../../axios/orders";
import {CHECKOUT_URL, SIGN_IN} from '../../utilities/constants'

import {connect} from 'react-redux'
import {
    onAddIngredient, onFetchInitialIngredients, onRemoveIngredient, onSaveIngredients,
} from '../../redux/ingredients/actions/ingredients'
import {isObjectEmpty} from '../../utilities/functions'
import {bindActionCreators} from 'redux'
import InformativeModal from './components/InformativeModal'
import {cleanRedirect} from '../../redux/Authentication/actions/auth'


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

export let BuilderBurger = props => {
    const {ingredients, totalPrice, error} = props
    const [purchasing, setPurchasing] = useState(false)
    const [loginToContinueModal, setLoginToContinueModal] = useState(false)

    useEffect(() => {
        if (props.redirectTo === CHECKOUT_URL) {
            props.cleanRedirect()
            props.history.push(CHECKOUT_URL)
        }

        if (!props.alreadySetInitialState) {
            props.onFetchInitialIngredients()
        }
    }, [])

    const updatePurchaseState = (ing) => {
        if (isObjectEmpty(ing)) return
        const sum = Object.keys(ing)
            .map(igKey => {
                return ing[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0
    }

    const onAddIngredientHandler = type => {
        UpdatingBurger(type, 1)
    }

    const onRemoveIngredientHandler = type => {
        UpdatingBurger(type, -1)
    }

    const UpdatingBurger = (type, moreOrLessIngredient) => {
        const oldCount = ingredients[type]
        if (moreOrLessIngredient < 0 && oldCount <= 0){
            console.log(type + ' counter is equals 0, You cannot rest this ingredient')
            return
        } else {
            // Price update
            const priceAddition = INGREDIENT_PRICES[type]
            const oldPrice = totalPrice
            const newPrice = oldPrice + (priceAddition * moreOrLessIngredient)

            moreOrLessIngredient > 0 ?
                props.onAddIngredient(type, newPrice) :
                props.onRemoveIngredient(type, newPrice)
        }
    }

    const purchaseHandler = () => {
        setPurchasing(!purchasing)
    }

    const purchaseContinueHandler = () => {
        onSaveIngredients({...ingredients}, totalPrice)
        if (props.isLogged) {
            props.history.push({
                pathname: CHECKOUT_URL,
            })
        } else {
            setLoginToContinueModal(true)
        }
    }

    const dismissInformativeModal = () => {
        setLoginToContinueModal(false)
    }

    const goToLoginToContinue = () => {
        props.history.push({
            pathname: SIGN_IN,
            hash: '#purchasing'
        })
    }

    const disableLessButtons = {
        ...ingredients
    }
    const disableMoreButtons = {
        ...ingredients
    }

    for (let key in disableLessButtons){
        disableLessButtons[key] = disableLessButtons[key] <= 0 // Returns true or false
        disableMoreButtons[key] = disableMoreButtons[key] >= 3 // You cannot buy > 3 ingredients for each one
    }

    let orderSummary = null

    let burger = error ? (
        <h2 style={{textAlign: 'center'}}>
            Ingredients can't be loaded
        </h2>) : <Spinner />

    // If we already got the 'ingredients' from Firebase
    if(ingredients) {
        burger = (
            <Aux>
                <Burger ingredients={ingredients} />
                <BuildControls
                    onAddIngredientHandler={onAddIngredientHandler}
                    onRemoveIngredientHandler={onRemoveIngredientHandler}
                    disabled={disableLessButtons}
                    disabledMoreButtons={disableMoreButtons}
                    purchasable={updatePurchaseState(ingredients)}
                    price={totalPrice}
                    onPurchaseHandler={purchaseHandler}
                    resetBuilding={props.onFetchInitialIngredients}
                />
            </Aux>
        )
        orderSummary = (
            <OrderSummary
                summary={totalPrice}
                dismiss={purchaseHandler}
                purchaseContinue={purchaseContinueHandler}
                ingredients={ingredients}/>
        )
    }

    return (
        <Aux>
            {purchasing && !loginToContinueModal ?
                <Modal show={purchasing} dismiss={purchaseHandler}>
                    {orderSummary}
                </Modal>
                : null}
            {burger}
            {loginToContinueModal ? (
                <Modal show={loginToContinueModal} dismiss={dismissInformativeModal}>
                    <InformativeModal
                        dismissModal={dismissInformativeModal}
                        onContinue={goToLoginToContinue} />
                </Modal>
            ) : null}
        </Aux>
    );
}

const actionCreators = {
    onAddIngredient,
    onRemoveIngredient,
    onSaveIngredients,
    onFetchInitialIngredients,
    cleanRedirect
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice,
        error: state.ingredientsReducer.error,
        alreadySetInitialState: state.ingredientsReducer.alreadySetInitialState,
        isLogged: state.authReducer.tokenId !== null,
        redirectTo: state.authReducer.redirectTo
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(actionCreators, dispatch)
}

// We pass the 'BuilderBurger' component, and the instance of axios, so with that
// we can call do the http request to firebase
BuilderBurger = withErrorHandler(BuilderBurger, axios)
export default connect(mapStateToProps, mapDispatchToProps)(BuilderBurger)