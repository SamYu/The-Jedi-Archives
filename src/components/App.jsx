import React from 'react';
import Header from './Header';
import ChartContainer from '../containers/ChartContainer';
import BottomNavContainer from '../containers/BottomNavContainer';


function App() {
    return (
        <div id="app">
            <Header />
            <ChartContainer />
            <BottomNavContainer />
        </div>
    );
}

export default App;
