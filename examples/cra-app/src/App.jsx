import React from 'react';
import logo from './logo.svg';
import './App.css';
import B from './b';
import Form from './Form';
import PageA from './Pages/PageA'
import PageB from './Pages/PageB'

function App() {

  return <div className="App">
    <PageA/>
    <PageB/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>123
           <B />
        </p>
          <Form/>
        <div style={{color:'red',position:'fixed',right:100,top:100,padding:10,border:'1px solid red'}}>
          绝对定位
        </div>
        <div id="div" style={{padding:100,border:'100px solid #fff',fontSize:20,color:'red'}}>
          我有margin，padding，border          
        </div>
        <div id="div" style={{margin:100,padding:100,border:'100px solid #fff',fontSize:20,color:'red'}}>
          我有margin，padding，border          
        </div>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer" >
          Learn React
        </a>
      </header>
    </div>;
}

export default App;
