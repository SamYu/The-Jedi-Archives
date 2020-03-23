import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from '../reducers/apiReducers';
import { loadState, saveState } from '../utils/storeUtils';
import App from './App';

// For use with redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Loads state from localStorage if exists
const persistedStore = loadState();
const store = createStore(
    rootReducer,
    persistedStore,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
);

// Saves state to localStorage on dispatchs
store.subscribe(() => {
    saveState(store.getState());
});

export default function Root() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
