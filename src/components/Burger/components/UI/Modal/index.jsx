import React from 'react';
import Classes from './Modal.css'
import Aux from "../../../../../hoc/Auxiliar";
import Backdrop from "../Backdrop";

const Modal = (props) => {
    return (
        <Aux>
            <Backdrop show={props.show} dismiss={props.dismiss}/>
            <div
                className={Classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </Aux>
    );
};

export default Modal;
