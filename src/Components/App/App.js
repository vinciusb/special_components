import './App.css';
import GradientButton from '../GradientButton/GradientButton';

function App() {
  return (
    <div className="App">
      <GradientButton text={ "Olá".toUpperCase() } font="Arial" fontSize={ 30 } color={ [255, 255, 255] }
        gradStart={ [0, 255, 255] } gradEnd={ [255, 0, 255] } />
    </div>
  );
}

export default App;