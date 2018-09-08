import React, {Component} from 'react';
import Aux from "../../hoc/Auxiliar";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/components/BuildControls";
import Modal from "../../components/Burger/components/UI/Modal";
import OrderSummary from "../../components/Burger/components/OrderSummary";
import Spinner from "../../components/Burger/components/UI/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler"

import axios from "../../axios/orders";


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
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false,
            error: false
        }
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
        })
            .catch(error => {
                this.setState({error:true});
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler = type => {
        this.UpdatingBurger(type, 1)
    }

    removeIngredientHandler = type => {
        this.UpdatingBurger(type, -1)
    }

    UpdatingBurger(type, moreOrLessIngredient) {
        const oldCount = this.state.ingredients[type]
        if (moreOrLessIngredient < 0 && oldCount <= 0){
            console.log(type + ' counter is equals 0, You cannot rest this ingredient')
            return
        } else {
            // Ingredient update
            const updatedCounted = oldCount + moreOrLessIngredient
            const updatedIngredients = {
                ...this.state.ingredients
            }

            updatedIngredients[type] = updatedCounted

            // Price update
            const priceAddition = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice = oldPrice + (priceAddition * moreOrLessIngredient)

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });

            this.updatePurchaseState(updatedIngredients)
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
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Richard Grac',
                address: {
                    street: 'Central St',
                    zipCode: 20000,
                    country: 'Mexico'
                },
                email: 'Richard_Grac@hotmail.com'
            },
            deliveryOrder: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response)
                this.setState({loading: false, purchasing: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false, purchasing: false});
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

        let burger = this.state.error? (
            <h2 style={{textAlign: 'center'}}>
                Ingredients can't be loaded
            </h2>) : <Spinner />

        // If we already got the 'ingredients' from Firebase
        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        onAddIngredientHandler={this.addIngredientHandler}
                        onRemoveIngredientHandler={this.removeIngredientHandler}
                        disabled={disableLessButtons}
                        disabledMoreButtons={disableMoreButtons}
                        purchasable={this.state.purchasable}
                        price={this.state.totalPrice}
                        onPurchaseHandler={this.purchaseHandler}
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
                {this.state.purchasing ?
                    <Modal show={this.state.purchasing} dismiss={this.purchaseHandler}>
                        {orderSummary}
                    </Modal>
                    : null}
                {burger}
            </Aux>
        );
    }
}

// We pass the 'BuilderBurger' component, and the instance of axios, so with that
// we can call do the http request to firebase
export default withErrorHandler(BuilderBurger, axios);