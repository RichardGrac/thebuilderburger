import React from 'react'
import Logo from "../../Logo";
import NavigationItems from "../NavigationItems";
import Classes from './SideDrawer.css'
import Backdrop from "../../UI/Backdrop";
import Aux from "../../../hoc/Auxiliar";

const SideDrawer = (props) => {

    let attachedClasses = [Classes.SideDrawer, Classes.Close]
    if (props.isShow) {
        attachedClasses = [Classes.SideDrawer, Classes.Open]
    }

    return (
        <Aux>
            <Backdrop show={props.isShow} dismiss={props.dismiss}/>
            <div className={attachedClasses.join(' ')}>
                <Backdrop/>
                <div className={Classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems
                        isAuthenticated={props.isAuthenticated}
                        dismissBackdrop={props.dismiss}
                    />
                </nav>
            </div>
        </Aux>
    )
}

export default SideDrawer
