import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from '../../../../../Library/Caches/typescript/2.9/node_modules/redux';
import thunk from 'redux-thunk'

import reducer from './store/reducers';

import './index.css';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';

// const logger = store => next => action => {
//     console.log('dispatching', action)
//     let result = next(action)
//     console.log('next state', store.getState())
//     return result
// }

const composeEnhancers = (process.env.NODE_ENV === 'production' ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
