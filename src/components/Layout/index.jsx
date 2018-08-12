import React from 'react'
import Aux from "../../hoc/Auxiliar";
import Classes from './Layout.css'

const Layout = (props) => {
    return (
        <Aux>
            <div>Toolbar, SideDrawer, Backdrop</div>
            <main className={Classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;
