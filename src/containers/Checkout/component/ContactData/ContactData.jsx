import React, {Component} from 'react'
import Button from '../../../../components/UI/Button'
import Classes from './ContactData.css'
import Spinner from '../../../../components/UI/Spinner'
import {withRouter} from 'react-router-dom'
import Input from '../../../../components/UI/Input/input'
import {connect} from 'react-redux'
import {onFetchInitialIngredients} from '../../../../redux/ingredients/actions/ingredients'
import {purchaseBurgerStart, resetBurgerPurchase} from '../../../../redux/orders/actions/orders'
import Modal from '../../../../components/UI/Modal'
// eslint-disable-next-line
const emailRegex = new RegExp(/^[-A-Z-a-z0-9~!$%^&*_=+}{\'?]+(\.[-A-Z-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/)

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
        this.setState({
            ingredients: this.props.ingredients
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.purchaseSuccess) {
            this.setState({loading: false}, () => {
                this.props.resetBurgerPurchase()
                this.props.onFetchInitialIngredients()
                this.props.history.push('/')
            })
        }

        this.setState({
            purchaseFail: nextProps.purchaseFail,
            loading: false
        })
    }

    dismissFailModal = () => {
        this.setState({purchaseFail: false})
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
            date: Date.now(),
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.tokenId)
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
                    errors = errors.concat('Name field should has at least 4 characters')
                }
                formErrors.name = errors
                break;

            case 'street':
                if (value.length < 1) {
                    errors = errors.concat('Street field should not be empty')
                }
                formErrors.street = errors
                break;

            case 'email':
                if (value.length < 1) {
                    errors = errors.concat('Email should not be empty')
                }
                if (!emailRegex.test(value)) {
                    errors = errors.concat('Invalid email')
                }
                formErrors.email = errors
                break;

            case 'postalCode':
                if (value.length < 5 || value.length > 6) {
                    errors = errors.concat('Invalid Zip Code')
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

                <Modal show={this.state.purchaseFail} dismiss={this.dismissFailModal}>
                    <p>There were problems saving the order</p>
                </Modal>

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

const mapStateToProps = state => {
    return {
        purchaseSuccess: state.ordersReducer.purchaseSuccess,
        purchaseFail: state.ordersReducer.purchaseFail,
        errorMessage: state.ordersReducer.errorMessage,
        tokenId: state.authReducer.tokenId,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (order, tokenId) => dispatch(purchaseBurgerStart(order, tokenId)),
        resetBurgerPurchase: () => dispatch(resetBurgerPurchase()),
        onFetchInitialIngredients: () => dispatch(onFetchInitialIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData))