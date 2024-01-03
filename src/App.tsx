import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import HandsContainer from './components/Hand';

import Projects from './pages/Projects';
import Interests from './pages/Interests';
import Achievements from './pages/Achievements';

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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(e.currentTarget.hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='App' onContextMenu={handleContextMenu}>
      <button
        onClick={() => setIsGesture(!isGesture)}
        className='test'
        style={{
          position: 'fixed',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          width: '100px',
          height: '100px',
          borderRadius: '0 50% 50% 0',
          backgroundColor: '#DC143C',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          cursor: 'pointer',
          border: 'none',
        }}>
        <b>Click me!</b>
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
          flexDirection: 'column',
        }}>
        <p>Context Menu</p>
        <a href='#header' onClick={handleNavClick}>
          Top
        </a>
        <a href='#projects' onClick={handleNavClick}>
          Projects
        </a>
        <a href='#interests' onClick={handleNavClick}>
          Interests
        </a>
        <a href='#achievements' onClick={handleNavClick}>
          Achievements
        </a>
      </div>
      <div className='App-body'>
        <Projects />
        <Interests />
        <Achievements />
      </div>
      {isGesture ? <HandsContainer /> : <></>}
    </div>
  );
};

const Header = () => {
  return (
    <div id='header' className='App-header'>
      {/* headshot, when clicked/waved switches to 16bitnarwhal */}
      <h1>Eric Zhang</h1>
      <p>Software Engineer, Creator, Learner</p>
    </div>
  );
};
// };

export default App;
