import React from 'react'
import Classes from './Button.css'

const Button = (props) => {
    return (
        <React.Fragment>
            <button className={[Classes.Button, Classes[props.btnType]].join(' ')}
                onClick={props.clicked}>
                {props.children}
            </button>
        </React.Fragment>
    );
};

export default Button;
