import React from 'react'
import Aux from "../../hoc/Auxiliar";
import Classes from './Layout.css'
import Toolbar from "../Navigation/Toolbar";

const Layout = (props) => {
    return (
        <Aux>
            <Toolbar/>
            <main className={Classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;
