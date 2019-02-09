import React from 'react'
import Classes from './BuildControls.css'
import BuildControl from "./BuildControl";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]

const BuildControls = (props) => {
    return (
        <div className={Classes.BuildControls}>
            <p>Current price: {' '}
                <strong>
                    ${props.price.toFixed(2)}
                </strong>
            </p>
            {controls.map(ctrl => {
                return <BuildControl
                    onAddIngredientHandler={() => props.onAddIngredientHandler(ctrl.type)}
                    onRemoveIngredientHandler={() => props.onRemoveIngredientHandler(ctrl.type)}
                    key={ctrl.label}
                    label={ctrl.label}
                    disabled={props.disabled[ctrl.type]}
                    disableMoreButton={props.disabledMoreButtons[ctrl.type]}
                />
            })}
            <div>
                <button
                    className={Classes.OrderButton}
                    disabled={!props.purchasable}
                    onClick={props.onPurchaseHandler}>
                    ORDER NOW
                </button>
                <button
                    className={Classes.OrderButton}
                    onClick={props.resetBuilding}>
                    RESET
                </button>
            </div>

        </div>
    );
};

export default BuildControls;

