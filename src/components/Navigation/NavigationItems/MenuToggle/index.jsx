import React from 'react'
import Classes from './MenuToggle.css'

const MenuNavigation = (props) => {
    return (
        <div className={Classes.DrawerToggle} onClick={props.dismiss}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default MenuNavigation
