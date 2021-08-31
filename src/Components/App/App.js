import React from 'react';
import './App.css';
import GradientButton from '../GradientButton/GradientButton';

function App() {
    return (
        <div className="App">
            <GradientButton
                onClick={() => { }}
                text={'Olá'.toUpperCase()}
                font="Arial"
                fontSize={30}
                color={[255, 255, 255]}
                gradStart={[0, 255, 0]}
                gradEnd={[0, 0, 255]}
                className="Olaa-bt"
            />
        </div>
    );
}

export default App;
