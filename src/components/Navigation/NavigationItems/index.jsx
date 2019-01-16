import React from 'react'
import Classes from './NavigationItems.css'
import NavigationItem from "./NavigationItem";
import {HOME_URL, ORDERS_URL} from '../../../utilities/constants'

const NavigationItems = () => {
    return (
        <React.Fragment>
            <ul className={Classes.NavigationItems}>
                <NavigationItem link={HOME_URL}>Burger Builder</NavigationItem>
                <NavigationItem link={ORDERS_URL}>Orders</NavigationItem>
            </ul>
        </React.Fragment>
    )
}

export default NavigationItems
