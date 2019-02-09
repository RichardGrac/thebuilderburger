import React, {Component} from 'react';
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

class BuilderBurger extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,

            loading: false,
            purchasable: false,
            purchasing: false,
            error: false,
            loginToContinueModal: false
        }
    }

    componentDidMount() {
        if (this.props.redirectTo === CHECKOUT_URL) {
            this.props.cleanRedirect()
            this.props.history.push(CHECKOUT_URL)
        }

        if (!this.props.alreadySetInitialState) {
            this.props.onFetchInitialIngredients()
        }
        this.updatePurchaseState()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ingredients: nextProps.ingredients,
            totalPrice: nextProps.totalPrice,
            error: nextProps.error
        }, () => this.updatePurchaseState(this.state.ingredients))
    }

    updatePurchaseState(ingredients = this.state.ingredients) {
        if (isObjectEmpty(ingredients)) {
            return
        }
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchasable: sum > 0})
    }

    onAddIngredientHandler = type => {
        this.UpdatingBurger(type, 1)
    }

    onRemoveIngredientHandler = type => {
        this.UpdatingBurger(type, -1)
    }

    UpdatingBurger(type, moreOrLessIngredient) {
        const oldCount = this.state.ingredients[type]
        if (moreOrLessIngredient < 0 && oldCount <= 0){
            console.log(type + ' counter is equals 0, You cannot rest this ingredient')
            return
        } else {
            // Price update
            const priceAddition = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice = oldPrice + (priceAddition * moreOrLessIngredient)

            moreOrLessIngredient > 0 ?
                this.props.onAddIngredient(type, newPrice) :
                this.props.onRemoveIngredient(type, newPrice)
            this.updatePurchaseState()
        }
    }

    purchaseHandler = () => {
        this.setState((prevState) => {
            return {
                 purchasing: !prevState.purchasing
            }
        });
    }

    purchaseContinueHandler = () => {
        this.props.onSaveIngredients({...this.state.ingredients}, this.state.totalPrice)
        if (this.props.isLogged) {
            this.props.history.push({
                pathname: CHECKOUT_URL,
            })
        } else {
            this.setState({
                loginToContinueModal: true
            })
        }
    }

    dismissInformativeModal = () => {
        this.setState({
            loginToContinueModal: false
        })
    }

    goToLoginToContinue = () => {
        this.props.history.push({
            pathname: SIGN_IN,
            hash: '#purchasing'
        })
    }

    render() {
        const disableLessButtons = {
            ...this.state.ingredients
        }
        const disableMoreButtons = {
            ...this.state.ingredients
        }

        for (let key in disableLessButtons){
            disableLessButtons[key] = disableLessButtons[key] <= 0 // Returns true or false
            disableMoreButtons[key] = disableMoreButtons[key] >= 3 // You cannot buy > 3 ingredients for each one
        }

        let orderSummary = null

        let burger = this.state.error ? (
            <h2 style={{textAlign: 'center'}}>
                Ingredients can't be loaded
            </h2>) : <Spinner />

        // If we already got the 'ingredients' from Firebase
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        onAddIngredientHandler={this.onAddIngredientHandler}
                        onRemoveIngredientHandler={this.onRemoveIngredientHandler}
                        disabled={disableLessButtons}
                        disabledMoreButtons={disableMoreButtons}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        onPurchaseHandler={this.purchaseHandler}
                        resetBuilding={this.props.onFetchInitialIngredients}
                    />
                </Aux>
            )
            orderSummary = (
                <OrderSummary
                    summary={this.state.totalPrice}
                    dismiss={this.purchaseHandler}
                    purchaseContinue={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
            )
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                {this.state.purchasing && !this.state.loginToContinueModal ?
                    <Modal show={this.state.purchasing} dismiss={this.purchaseHandler}>
                        {orderSummary}
                    </Modal>
                    : null}
                {burger}
                {this.state.loginToContinueModal ? (
                    <Modal show={this.state.loginToContinueModal} dismiss={this.dismissInformativeModal}>
                        <InformativeModal
                            dismissModal={this.dismissInformativeModal}
                            onContinue={this.goToLoginToContinue} />
                    </Modal>
                ) : null}
            </Aux>
        );
    }
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