import React from 'react'
import Aux from "../Auxiliar"
import Modal from "../../components/UI/Modal"
import useHttpErrorHandler from '../../hooks/httpErrorHandler'

const withErrorHandler = (WrappedComponent, axios) => {
    // Anonymous class
    return function (props) {
        const [error, dismissModal] = useHttpErrorHandler(axios)
        return (
            <Aux>
                <Modal
                    show={error}
                    dismiss={dismissModal}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }
}

export default withErrorHandler