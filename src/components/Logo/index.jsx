import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import Classes from './Logo.css'

const Logo = (props) => {
    return (
        <div className={Classes.Logo}>
            <img src={burgerLogo} alt="burger-logo.png"/>
        </div>
    )
}

export default Logo
