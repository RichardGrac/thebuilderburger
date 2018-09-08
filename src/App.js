import React, {Component} from 'react';
import Layout from "./containers/Layout";
import BuilderBurger from "./containers/BurgerBuilder";

class App extends Component {
    render() {
        return (
            <Layout>
                <BuilderBurger/>
            </Layout>
        );
    }
}

export default App;
