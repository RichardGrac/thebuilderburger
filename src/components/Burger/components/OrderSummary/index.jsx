import React from 'react'
import Aux from "../../../../hoc/Auxiliar";
import Button from "../UI/Button";

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                        {igKey}: {props.ingredients[igKey]}
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
            <p><strong>Total Price: ${props.summary.toFixed(2)}</strong></p>
            <p>Continue with Checkout?</p>
            <Button clicked={props.dismiss} btnType='Danger'>Cancel</Button>
            <Button clicked={props.purchaseContinue} btnType='Success'>Continue</Button>
        </Aux>
    );
};

export default OrderSummary;
