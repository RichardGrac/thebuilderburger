import React from 'react'
import Classes from './Toolbar.css'
import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import MenuNavigation from "../NavigationItems/MenuToggle";


const Toolbar = (props) => {
    return (
        <React.Fragment>
            <header className={Classes.Toolbar}>
                <MenuNavigation dismiss={props.dismiss}/>
                <div className={Classes.Logo}>
                    <Logo />
                </div>
                <nav className={Classes.DesktopOnly}>
                    <NavigationItems isAuthenticated={props.isAuthenticated} />
                </nav>
            </header>
        </React.Fragment>
    )
}

export default Toolbar
