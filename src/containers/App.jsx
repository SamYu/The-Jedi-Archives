import React from 'react';
import ChartsView from '../views/ChartsView';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';


function App() {
    return (
        <div id="app">
            <Header />
            <ChartsView />
            <BottomNav />
        </div>
    );
}

export default App;
