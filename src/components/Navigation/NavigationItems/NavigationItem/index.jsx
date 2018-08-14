import React from 'react'
import Classes from './NavigationItem.css'

const NavigationItem = (props) => {
    return (
        <React.Fragment>
            <li className={Classes.NavigationItem}>
                <a href={props.link}
                   className={props.active ? Classes.active : null}>
                    {props.children}
                </a>
            </li>
        </React.Fragment>
    )
}

export default NavigationItem
