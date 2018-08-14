import React from 'react'
import Classes from './Toolbar.css'
import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";


const Toolbar = (props) => {
    return (
        <React.Fragment>
            <header className={Classes.Toolbar}>
                <div>MENU</div>
                <Logo />
                <nav>
                    <NavigationItems/>
                </nav>
            </header>
        </React.Fragment>
    )
}

export default Toolbar
