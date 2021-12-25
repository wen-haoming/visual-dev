import Header from './header';
import List from './List';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src="/visual-dev/logo.png" alt="" />
      <header className="App-header">
        <Header />
        <p className="title">
          Quick jump to local IDE source code directly from browser React component by just a simple
          click!
        </p>
        <List />
        <code className="code"> npm i -D visual-dev</code>
      </header>
    </div>
  );
}

export default App;
