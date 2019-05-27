import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, compose, applyMiddleware, } from 'redux'
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux'
import { ReactReduxFirebaseProvider, reactReduxFirebase } from 'react-redux-firebase'
import { createFirestoreInstance, getFirestore, reduxFirestore } from 'redux-firestore' // <- needed if using firestore
import firebaseConfig from './config/firebaseConfig'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({ getFirestore })),
        reduxFirestore(firebaseConfig)
    ))

const rrfConfig = {
    userProfile: 'users',
}

const rrfProps = {
    firebase: firebaseConfig,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}


ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <App />
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root') as HTMLElement);
serviceWorker.unregister();
