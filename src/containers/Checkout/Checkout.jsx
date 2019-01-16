import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {CHECKOUT_URL, CONTACT_URL} from '../../utilities/constants'
import {Route} from 'react-router-dom'
import ContactData from './component/ContactData/ContactData'
import {isObjectEmpty} from '../../utilities/functions'
import {Redirect} from 'react-router'

class Checkout extends Component {

    state = {
        totalPrice: 0,
        ingredients: {}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search)
        let ingredients = {}
        let totalPrice
        for(let param of query.entries()) {
            ingredients[param[0]] = +param[1]
        }
        totalPrice = ingredients.totalPrice
        delete ingredients.totalPrice
        this.setState({ingredients, totalPrice})
    }

    onCancelled = () => {
        this.props.history.goBack()
    }

    continuePurchase = () => {
        if (!isObjectEmpty({...this.state.ingredients})) {
            this.props.history.replace(CONTACT_URL)
        }
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    continuePurchase={this.continuePurchase}
                    onCancelled={this.onCancelled}
                />

                {!isObjectEmpty({...this.state.ingredients}) ? (
                    <Route path={CONTACT_URL} render={() => <ContactData
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}
                    />} />
                ) : <Redirect to={CHECKOUT_URL} from={CONTACT_URL} />}

            </div>
        )
    }
}

export default Checkout