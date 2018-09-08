import React, {Component} from 'react'
import Classes from './Modal.css'
import Aux from "../../../../../hoc/Auxiliar";
import Backdrop from "../Backdrop";

class Modal extends Component {

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[shouldComponentUpdate] will update')
    //     return nextProps.show !== this.props.show
    // }
    //
    // componentWillUpdate() {
    //     console.log('[Modal] will update')
    // }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} dismiss={this.props.dismiss}/>
                <div
                    className={Classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
