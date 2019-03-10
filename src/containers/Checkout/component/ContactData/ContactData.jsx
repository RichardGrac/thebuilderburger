import React, {useState, useEffect} from 'react'
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

const ContactData = props => {

    const [state, setState] = useState({
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
    })
    const [purchaseFail, setPurchaseFail] = useState(props.purchaseFail)

    useEffect(() => {
        setState({
            ...state,
            ingredients: props.ingredients
        })
    }, [])

    useEffect(() => {
        setPurchaseFail(props.purchaseFail)
        setState({
            ...state,
            loading: false,
            ingredients: props.ingredients
        })
    })

    useEffect(() => {
        if (props.purchaseSuccess) {
            setState({
                ...state,
                loading: false
            })
            props.resetBurgerPurchase()
            props.onFetchInitialIngredients()
            props.history.push('/')
        }
    }, [props.purchaseSuccess])

    const dismissFailModal = () => {
        setPurchaseFail(false)
    }

    const orderHandler = (event) => {
        event.preventDefault()
        let {name, email, street, postalCode, deliveryOrder, errorValidations} = state

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

        setState({...state, loading: true})
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
            ingredients: props.ingredients,
            price: props.totalPrice,
            date: Date.now(),
            userId: props.userId
        }

        props.onOrderBurger(order, props.tokenId)
    }

    const onHandleValue = e => {
        let { value, id } = e.target
        let formErrors = {...state.errorValidations}
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

        setState({
            ...state,
            [id]: originalValue,
            errorValidations: formErrors
        })
    }

    const {errorValidations, name, email, street, postalCode, deliveryOrder} = state
    return (
        <div className={Classes.ContactData}>

            <Modal show={purchaseFail} dismiss={dismissFailModal}>
                <p>There were problems saving the order</p>
            </Modal>

            {state.loading ? <Spinner /> : (
                <div>
                    <h4>Enter your Contact Data</h4>
                    <form action={'POST'} onSubmit={orderHandler}>
                        <Input inputType='input'
                               type='text'
                               id='name'
                               placeholder='Your name'
                               label='Name'
                               onChange={onHandleValue}
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
                               onChange={onHandleValue}
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
                               onChange={onHandleValue}
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
                               onChange={onHandleValue}
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
                               options={state.deliveryOrderArray}
                               label='Method'
                               onChange={onHandleValue}
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