import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';

import rootReducer from '../reducers/apiReducers';
import { loadState, saveState } from '../utils/storeUtils';
import App from '../components/App';

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

const theme = createMuiTheme({
    typography: {
        fontFamily: 'Distant Galaxy',
    },
    palette: {
        primary: {
            main: '#000',
        },
    },
});

export default function Root() {
    return (
        <MuiThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </MuiThemeProvider>
    );
}
