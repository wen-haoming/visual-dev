import React from 'react';
import logo from './logo.svg';
import './App.css';
import B from './b';

function App() {
  return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           <B />
        </p>喔、、
        <div id="div" style={{margin:100,padding:100,border:'100px solid #ccc',fontSize:20,color:'red'}}>
          我有margin，padding，border          
        </div>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>;
}

export default App;