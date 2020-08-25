import React from 'react';
import './App.css';
import Weather from "./components/Weather.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Weather App</h1>
      </header>
      <main>
        <Weather />
      </main>
      <footer>
        Page created by Luke Bell
      </footer>
    </div>
  );
}

export default App;

