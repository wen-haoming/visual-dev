import { useEffect, useRef } from 'react';
import Header from './header';
import List from './List';
import './App.css';
import Footer from './Footer';

function App() {
  const wrapper = useRef<HTMLDivElement>();

  useEffect(() => {
    setTimeout(() => {
      const aimDom = document.querySelector('.vd-aim');
      if (aimDom) {
        wrapper.current.appendChild(aimDom);
      }
    }, 500);
  }, []);

  return (
    <div className="App">
      <img src="/visual-dev/logo.png" alt="" />
      <Header />
      <p className="title">Just one click, you can jump directly to the local IDE source code!</p>
      <List />
      <div className="container" ref={wrapper}>
        <span className="text">Try clicking and dragging 👉 </span>
      </div>
      <code className="code"> npm i -D visual-dev</code>
      <Footer />
    </div>
  );
}

export default App;
