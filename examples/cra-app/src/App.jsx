import React from 'react';
import logo from './logo.svg';
import './App.css';
import B from './b';
import { Button } from "antd";

function App() {
  return <div className="App">
      <header className="App-header">
       
        <img src={logo} className="App-logo" alt="logo" />
        <p>
           <B />
        </p>
        <div><Button>1111</Button>;123</div>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>;
}

export default App;