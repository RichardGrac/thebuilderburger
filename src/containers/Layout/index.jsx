import React, {useState} from 'react'
import Aux from "../../hoc/Auxiliar";
import Classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/index";
import SideDrawer from "../../components/Navigation/SideDrawer/index";
import {connect} from 'react-redux'


const Layout = props => {
    const [isSidedrawerShown, setSideDrawerStatus] = useState(false)

    const onDismissSideDrawer = () => {
        setSideDrawerStatus(!isSidedrawerShown)
    }

    const {isAuthenticated} = props
    return (
        <Aux>
            <Toolbar dismiss={onDismissSideDrawer}
                     isAuthenticated={isAuthenticated} />
            <SideDrawer isShow={isSidedrawerShown}
                        dismiss={onDismissSideDrawer}
                        isAuthenticated={isAuthenticated} />
            <main className={Classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.tokenId !== null
    }
}

export default connect(mapStateToProps, null)(Layout)
