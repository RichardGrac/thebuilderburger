import React, {Component} from 'react'
import Aux from "../../hoc/Auxiliar";
import Classes from './Layout.css'
import Toolbar from "../../components/Navigation/Toolbar/index";
import SideDrawer from "../../components/Navigation/SideDrawer/index";


class Layout extends Component {

    constructor () {
        super()
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
        return (
            <Aux>
                <Toolbar dismiss={this.onDismissSideDrawer}/>
                <SideDrawer isShow={this.state.isSidedrawerShown} dismiss={this.onDismissSideDrawer} />
                <main className={Classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout;
