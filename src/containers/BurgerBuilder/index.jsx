import React, {Component} from 'react';
import Aux from "../../hoc/Auxiliar";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/components/BuildControls";
import Modal from "../../components/Burger/components/UI/Modal";
import OrderSummary from "../../components/Burger/components/OrderSummary";

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
            ingredients: {
                salad: 0,
                bacon: 0,
                cheese: 0,
                meat: 0
            },
            totalPrice: 4,
            purchasable: false,
            purchasing: false
        }
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
        return (
            <Aux>
                {this.state.purchasing ?
                    <Modal show={this.state.purchasing} dismiss={this.purchaseHandler}>
                        <OrderSummary ingredients={this.state.ingredients}/>
                    </Modal>
                    : null}

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
        );
    }
}

export default BuilderBurger;