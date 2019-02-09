import React, {Component} from 'react'
import Aux from "../../hoc/Auxiliar";
import Classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/index";
import SideDrawer from "../../components/Navigation/SideDrawer/index";
import {connect} from 'react-redux'


class Layout extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isSidedrawerShown: false
        };
    }


    onDismissSideDrawer = () => {
        this.setState(prevState => {
            return {isSidedrawerShown: !prevState.isSidedrawerShown}
        });
    }


    render() {
        const {isAuthenticated} = this.props
        return (
            <Aux>
                <Toolbar dismiss={this.onDismissSideDrawer}
                         isAuthenticated={isAuthenticated} />
                <SideDrawer isShow={this.state.isSidedrawerShown}
                            dismiss={this.onDismissSideDrawer}
                            isAuthenticated={isAuthenticated} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.tokenId !== null
    }
}

export default connect(mapStateToProps, null)(Layout)
