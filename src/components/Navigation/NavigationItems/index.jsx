import React from 'react'
import Classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem";
import {SIGN_IN, HOME_URL, ORDERS_URL, SIGN_UP, LOG_OUT} from '../../../utilities/constants'

const NavigationItems = (props) => {
    const {isAuthenticated} = props
    return (
        <React.Fragment>
            <ul className={Classes.NavigationItems}>
                <NavigationItem onClick={props.dismissBackdrop} link={HOME_URL}>Burger Builder</NavigationItem>
                {isAuthenticated ? (
                    <React.Fragment>
                        <NavigationItem onClick={props.dismissBackdrop} link={ORDERS_URL}>Orders</NavigationItem>
                        <NavigationItem onClick={props.dismissBackdrop} link={LOG_OUT}>Logout</NavigationItem>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavigationItem onClick={props.dismissBackdrop} link={SIGN_IN}>Sign In</NavigationItem>
                        <NavigationItem onClick={props.dismissBackdrop} link={SIGN_UP}>Sign Up</NavigationItem>
                    </React.Fragment>
                )}

            </ul>
        </React.Fragment>
    )
}

export default NavigationItems
