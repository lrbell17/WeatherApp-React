import React from 'react';
import './App.css';
import SearchByCity from './components/SearchByCity.js';
import MapContainer from './components/Map.js';
//import classes from './css/map.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Weather App</h1>
      
      </header>
      
      <main>
      <div>
        <SearchByCity />
        </div>
        <div>
          <MapContainer />
        </div>

      </main>
      <footer>
        Page created by Luke Bell
      </footer>
    </div>
  );
}

export default App;

