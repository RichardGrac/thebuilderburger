import React, {Component} from 'react'
import Aux from "../../../../hoc/Auxiliar";
import Button from "../../../UI/Button";

class OrderSummary extends Component {

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}: {this.props.ingredients[igKey]}
                    </span>
                    </li>)
            })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: ${this.props.summary.toFixed(2)}</strong></p>
                <p>Continue with Checkout?</p>
                <Button clicked={this.props.dismiss} btnType='Danger'>Cancel</Button>
                <Button clicked={this.props.purchaseContinue} btnType='Success'>Continue</Button>
            </Aux>
        );
    }
}

export default OrderSummary;