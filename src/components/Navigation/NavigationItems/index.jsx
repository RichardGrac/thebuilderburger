import React from 'react'
import Classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem";

const NavigationItems = (props) => {
    return (
        <React.Fragment>
            <ul className={Classes.NavigationItems}>
                <NavigationItem link='/' active>Burger Builder</NavigationItem>
                <NavigationItem link='/'>Checkout</NavigationItem>
            </ul>
        </React.Fragment>
    )
}

export default NavigationItems
