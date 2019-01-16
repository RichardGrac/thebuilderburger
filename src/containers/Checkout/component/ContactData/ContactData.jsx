import React, {Component} from 'react'
import Button from '../../../../components/UI/Button'
import Classes from './ContactData.css'
import axios from '../../../../axios/orders'
import Spinner from '../../../../components/UI/Spinner'
import {withRouter} from 'react-router-dom'
import Input from '../../../../components/UI/Input/input'
// import {isObjectEmpty} from '../../../../utilities/functions'
// import {CHECKOUT_URL} from '../../../../utilities/constants'

const emailRegex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/)

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        street: '',
        postalCode: '',
        deliveryOrderArray: ['Fastest', 'Normal', 'Cheapest'],
        deliveryOrder: 'Fastest',
        loading: false,
        ingredients: null,

        errorValidations: {
            name: [],
            email: [],
            street: [],
            postalCode: [],
            deliveryOrder: []
        }
    }

    componentDidMount() {
        /* To ensure that we cannot continue with the Contact Form */
        // if (isObjectEmpty(this.props.ingredients)) {
        //     this.props.history.replace(CHECKOUT_URL)
        // }
        this.setState({
            ingredients: this.props.ingredients
        })
    }

    orderHandler = (event) => {
        event.preventDefault()
        let {name, email, street, postalCode, deliveryOrder, errorValidations} = this.state

        let continueSubmitting =
            name !== '' && email !== '' && street !== '' && postalCode !== '' && deliveryOrder !== ''

        if (continueSubmitting){
            Object.values(errorValidations).forEach(valueHasErrors => {
                valueHasErrors.length !== 0 && (continueSubmitting = false)
            })
        }

        if (!continueSubmitting) {
            window.alert('Invalid form, please check it')
            return
        }

        this.setState({loading: true})
        const order = {
            customer: {
                name,
                email,
                address: {
                    street,
                    postalCode
                }
            },
            deliveryOrder,
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
        }

        axios.post('/orders.json', order)
            .then(response => {
                console.log('response', response)
                this.setState({loading: false}, () => this.props.history.push('/'))
            })
            .catch(error => {
                console.error(error)
                this.setState({loading: false}, () => window.alert('Something went wrong with the Order requested'))
            })
    }

    onHandleValue = e => {
        let { value, id } = e.target
        let formErrors = {...this.state.errorValidations}
        let errors = []
        const originalValue = value
        value = value.trim()

        switch (id) {
            case 'name':
                if (value.length < 4) {
                    errors.push('Name should at least 4 characters')
                }
                formErrors.name = errors
                break;

            case 'street':
                if (value.length < 1) {
                    errors.push('Street should not be empty')
                }
                formErrors.street = errors
                break;

            case 'email':
                if (value.length < 1) {
                    errors.push('Email should not be empty')
                }
                if (!emailRegex.test(value)) {
                    errors.push('Invalid email')
                }
                formErrors.email = errors
                break;

            case 'postalCode':
                if (value.length < 5 || value.length > 6) {
                    errors.push('Invalid Zip Code')
                }
                formErrors.postalCode = errors
                break;

            default:
                break;
        }

        this.setState({
            [id]: originalValue,
            errorValidations: formErrors
        })
    }


    render() {
        const {errorValidations, name, email, street, postalCode, deliveryOrder} = this.state
        return (
            <div className={Classes.ContactData}>
                {this.state.loading ? <Spinner /> : (
                    <div>
                        <h4>Enter your Contact Data</h4>
                        <form action={'POST'} onSubmit={this.orderHandler}>
                            <Input inputType='input'
                                   type='text'
                                   id='name'
                                   placeholder='Your name'
                                   label='Name'
                                   onChange={this.onHandleValue}
                                   value={name}
                                   invalidInput={errorValidations.name.length > 0}
                            />
                            {errorValidations.name.length > 0 ? (<div className={Classes.ErrorMessage}>
                                {errorValidations.name.map((error, i) =>
                                    (<span key={i}>{error}</span>)
                                )}
                            </div>) : null}

                            <Input inputType='input'
                                   type='email'
                                   id='email'
                                   placeholder='Your Email'
                                   label='Email'
                                   onChange={this.onHandleValue}
                                   value={email}
                                   invalidInput={errorValidations.email.length > 0}
                            />
                            {errorValidations.email.length > 0 ? (<div className={Classes.ErrorMessage}>
                                {errorValidations.email.map((error, i) =>
                                    (<span key={i}>{error}</span>)
                                )}
                            </div>) : null}

                            <Input inputType='input'
                                   type='text'
                                   id='street'
                                   placeholder='Your Street'
                                   label='Street'
                                   onChange={this.onHandleValue}
                                   value={street}
                                   invalidInput={errorValidations.street.length > 0}
                            />
                            {errorValidations.street.length > 0 ? (<div className={Classes.ErrorMessage}>
                                {errorValidations.street.map((error, i) =>
                                    (<span key={i}>{error}</span>)
                                )}
                            </div>) : null}

                            <Input inputType='input'
                                   type='text'
                                   id='postalCode'
                                   placeholder='Your Postal Code'
                                   label='Postal Code'
                                   onChange={this.onHandleValue}
                                   value={postalCode}
                                   invalidInput={errorValidations.postalCode.length > 0}
                            />
                            {errorValidations.postalCode.length > 0 ? (<div className={Classes.ErrorMessage}>
                                {errorValidations.postalCode.map((error, i) =>
                                    (<span key={i}>{error}</span>)
                                )}
                            </div>) : null}

                            <Input inputType='select'
                                   type='select'
                                   id='deliveryOrder'
                                   options={this.state.deliveryOrderArray}
                                   label='Method'
                                   onChange={this.onHandleValue}
                                   value={deliveryOrder}
                                   invalidInput={errorValidations.deliveryOrder.length > 0}
                            />
                            <Button btnType='Success'>
                                ORDER
                            </Button>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}

export default withRouter(ContactData)