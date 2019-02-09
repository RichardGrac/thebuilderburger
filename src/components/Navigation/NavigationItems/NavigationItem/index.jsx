import React from 'react'
import Classes from './NavigationItem.css'
import {NavLink} from 'react-router-dom'
import {HOME_URL} from '../../../../utilities/constants'

const NavigationItem = (props) => {
    return (
        <React.Fragment>
            <li onClick={props.onClick} className={Classes.NavigationItem}>
                <NavLink to={props.link}
                         exact={props.link === HOME_URL}
                         activeClassName={Classes.active}>
                    {props.children}
                </NavLink>
            </li>
        </React.Fragment>
    )
}

export default NavigationItem
