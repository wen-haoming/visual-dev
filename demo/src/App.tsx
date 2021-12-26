import { useEffect, useRef } from 'react';
import Header from './header';
import List from './List';
import './App.css';

function App() {
  const wrapper = useRef<HTMLDivElement>();
  useEffect(() => {
    setTimeout(() => {
      const aimDom = document.querySelector('.vd-aim');
      if (aimDom) {
        wrapper.current.appendChild(aimDom);
      }
    }, 100);
  }, []);
  return (
    <div className="App">
      <img src="/visual-dev/logo.png" alt="" />
      <header className="App-header">
        <Header />
        <p className="title">
          Quick jump to local IDE source code directly from browser React and Vue component by just
          a simple click!
        </p>
        <List />
        <code className="code"> npm i -D visual-dev</code>
        <div ref={wrapper} style={{ marginTop: 100 }}></div>
      </header>
    </div>
  );
}

export default App;
