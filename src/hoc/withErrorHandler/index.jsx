import React, {Component} from 'react';
import Aux from "../Auxiliar";
import Modal from "../../components/Burger/components/UI/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    // Anonymous class
    return class extends Component  {

        state = {
            error:null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error:null})
                return request
            })

            // res => res  Is the same as 'return res'
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error:error})
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.response.eject(this.resInterceptor)
        }

        dismissModal = () => {
            this.setState({error:null});
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        dismiss={this.dismissModal}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }

    }
}

export default withErrorHandler