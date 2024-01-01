import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import HandsContainer from './components/Hand';

import Projects from './pages/Projects';
import Interests from './pages/Interests';
import Achievements from './pages/Achievements';
import Socials from './pages/Socials';

const App = () => {
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [isGesture, setIsGesture] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      let x = e.clientX;
      let y = e.clientY;

      // Adjust if off screen right
      if (x + contextMenu.offsetWidth > window.innerWidth) {
        x -= contextMenu.offsetWidth;
      }

      // Adjust if off screen bottom
      if (y + contextMenu.offsetHeight > window.innerHeight) {
        y -= contextMenu.offsetHeight;
      }

      if (contextMenuActive) {
        contextMenu.style.visibility = 'hidden';
      } else {
        contextMenu.style.visibility = 'visible';
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
      }
      setContextMenuActive(!contextMenuActive);
    }
  };

  useEffect(() => {
    const stylesheet = document.styleSheets[0];
    console.log(isGesture);
    if (isGesture) stylesheet.insertRule('* { cursor: none !important; }');
    else {
      let ruleIndex = -1;
      for (let i = 0; i < stylesheet.cssRules.length; i++) {
        if (
          stylesheet.cssRules[i].cssText.startsWith(
            '* { cursor: none !important; }'
          )
        ) {
          ruleIndex = i;
          break;
        }
      }
      if (ruleIndex !== -1) stylesheet.deleteRule(ruleIndex);
    }
  }, [isGesture]);

  // // scroll to header
  // useEffect(() => {
  //   if (window.location.hash === '') return;
  //   const element = document.getElementById('header');
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <div className='App' onContextMenu={handleContextMenu}>
        <button
          onClick={() => setIsGesture(!isGesture)}
          className='test'
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
            width: 100,
            height: 100,
          }}>
          Click me
        </button>
        <Header />
        <div
          id='context-menu'
          style={{
            position: 'fixed',
            display: 'flex',
            visibility: 'hidden',
            width: '200px',
            height: '200px',
            backgroundColor: 'red',
            flexDirection: 'column',
          }}>
          <p>Context Menu</p>
          <Link to={{ pathname: '/projects' }}>Projects</Link>
          <Link to={{ pathname: '/interests' }}>Interests</Link>
          <Link to={{ pathname: '/achievements' }}>Achievements</Link>
          <Link to={{ pathname: '/socials' }}>Socials</Link>
        </div>
        <div className='App-body'>
          <Routes>
            <Route path='/projects' element={<Projects />} />
            <Route path='/interests' element={<Interests />} />
            <Route path='/achievements' element={<Achievements />} />
            <Route path='/socials' element={<Socials />} />
            <Route path='/' element={<Projects />} />
          </Routes>
        </div>
        {isGesture ? <HandsContainer /> : <></>}
      </div>
    </BrowserRouter>
  );
};

const Header = () => {
  return (
    <div className='App-header'>
      {/* headshot, when clicked/waved switches to 16bitnarwhal */}
      <h1>Eric Zhang</h1>
      <p>Software Engineer, Creator, Learner</p>
    </div>
  );
};
// };

export default App;
