import React from 'react'
import burgerLogo from '../../assets/images/burger-logo.png'
import Classes from './Logo.css'
import {Link} from 'react-router-dom'

const Logo = (props) => {
    return (
        <div className={Classes.Logo}>
            <Link to='/'>
                <img src={burgerLogo} alt="burger-logo.png"/>
            </Link>
        </div>
    )
}

export default Logo
