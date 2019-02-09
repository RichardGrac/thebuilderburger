import React, {Component} from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import {CHECKOUT_URL, CONTACT_URL} from '../../utilities/constants'
import {Route} from 'react-router-dom'
import ContactData from './component/ContactData/ContactData'
import {isObjectEmpty} from '../../utilities/functions'
import {Redirect} from 'react-router'

import {connect} from 'react-redux'

class Checkout extends Component {

    state = {
        totalPrice: 0,
        ingredients: {}
    }

    componentWillReceiveProps(nextProps) {
        const {ingredients, totalPrice} = nextProps
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredientsReducer.ingredients,
        totalPrice: state.ingredientsReducer.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)