import React from 'react';
import Classes from './BuildControl.css'

const BuildControl = (props) => {
    return (
        <div className={Classes.BuildControl}>
            <div
                className={Classes.Label}>{props.label}</div>
            <button
                className={Classes.Less}
                onClick={props.onRemoveIngredientHandler}
                disabled={props.disabled}>Less
            </button>
            <button
                className={Classes.More}
                onClick={props.onAddIngredientHandler}
                disabled={props.disableMoreButton}>More
            </button>
        </div>
    );
};

export default BuildControl;
