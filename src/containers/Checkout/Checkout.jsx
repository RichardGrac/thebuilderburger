import React from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {CHECKOUT_URL, CONTACT_URL, HOME_URL} from '../../utilities/constants'
import {Route} from 'react-router-dom'
import ContactData from './component/ContactData/ContactData'
import {isObjectEmpty} from '../../utilities/functions'
import {Redirect, withRouter} from 'react-router'

import {connect} from 'react-redux'

const Checkout = props => {
    const {ingredients, totalPrice} = props

    const onCancelled = () => {
        props.history.push(HOME_URL)
    }

    const continuePurchase = () => {
        if (!isObjectEmpty({...ingredients})) {
            props.history.replace(CONTACT_URL)
        }
    }

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                continuePurchase={continuePurchase}
                onCancelled={onCancelled}
            />

            {!isObjectEmpty({...ingredients}) ? (
                <Route path={CONTACT_URL} render={() => <ContactData
                    ingredients={ingredients}
                    totalPrice={totalPrice}
                />} />
            ) : <Redirect to={CHECKOUT_URL} from={CONTACT_URL} />}

        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice
    }
}

export default withRouter(connect(mapStateToProps, null)(Checkout))