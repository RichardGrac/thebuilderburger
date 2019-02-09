import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import {rootReducer} from './redux/reducers'

import thunk from 'redux-thunk'
const composeEnhancers = process.env.NODE_ENV === 'environment' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

const myApp = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(myApp, document.getElementById('root'));
registerServiceWorker();
