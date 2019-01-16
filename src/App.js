import React, {Component} from 'react';
import Layout from "./containers/Layout";
import BuilderBurger from "./containers/BurgerBuilder";
import Checkout from './containers/Checkout/Checkout'
import {Route, Switch} from 'react-router-dom'
import {CHECKOUT_URL, HOME_URL, ORDERS_URL} from './utilities/constants'
import Orders from './containers/Orders/Orders'

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path={HOME_URL} exact component={BuilderBurger} />
                    <Route path={CHECKOUT_URL} component={Checkout} />
                    <Route path={ORDERS_URL} component={Orders} />
                </Switch>
            </Layout>
        );
    }
}

export default App;
