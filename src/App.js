import React, {Component, Suspense} from 'react';
import Layout from "./containers/Layout";
import BuilderBurger from "./containers/BurgerBuilder";
import {withRouter, Route, Switch} from 'react-router-dom'
import {CHECKOUT_URL, HOME_URL, LOG_OUT, ORDERS_URL, SIGN_IN, SIGN_UP} from './utilities/constants'
import Auth from './containers/Auth'
import {Redirect} from 'react-router'
import {connect} from 'react-redux'
import {authCheckState, logout} from './redux/Authentication/actions/auth'

const Orders = React.lazy(() => import('./containers/Orders/Orders'))
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'))

class App extends Component {

    componentDidMount() {
        this.props.onTryToLogin()
    }

    asyncComponent = (component) => {
        return (
            <Suspense fallback={<div>Loading...</div>}>
                {(component)}
            </Suspense>
        )
    }

    logout = () => {
        this.props.logout()
        return <Redirect to={HOME_URL} />
    }

    render() {
        const {isLogged} = this.props
        return (
            <Layout>
                {isLogged ? (
                    <Switch>
                        <Route path={HOME_URL} exact component={BuilderBurger} />
                        <Route path={CHECKOUT_URL} render={() => this.asyncComponent(<Checkout />)} />
                        <Route path={ORDERS_URL} component={() => this.asyncComponent(<Orders />)} />
                        <Route path={LOG_OUT} render={this.logout} />
                        <Redirect to={HOME_URL} />
                    </Switch>
                ) : (
                    <Switch>
                        <Route path={HOME_URL} exact component={BuilderBurger} />
                        <Route path={SIGN_IN} render={(props) => <Auth {...props} isSignIn />} />
                        <Route path={SIGN_UP} render={(props) => <Auth {...props} isSignIn={false} />} />
                        <Redirect to={SIGN_IN} />
                    </Switch>
                )}
            </Layout>
        );
    }
}

const mapStateToProps = state => {
    return { isLogged: state.authReducer.tokenId !== null }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
        onTryToLogin: () => dispatch(authCheckState())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))