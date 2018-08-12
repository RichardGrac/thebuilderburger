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
        </div>
    );
};

export default BuildControls;
