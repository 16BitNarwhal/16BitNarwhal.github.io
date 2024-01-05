import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Projects from './pages/Projects';
import Interests from './pages/Interests';
import Achievements from './pages/Achievements';

import HandsContainer from './components/Hand';
import ContextMenu from './components/ContextMenu';
import HowToHand from './components/HowToHand';

const App = () => {
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [isGesture, setIsGesture] = useState(false);
  const [isHowToHand, setIsHowToHand] = useState(false);

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
    if (isGesture) {
      stylesheet.insertRule('* { cursor: none !important; }');
      setIsHowToHand(true);
    } else {
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

  return (
    <div id='paint-on'>
      <div className='App' onContextMenu={handleContextMenu}>
        <button
          onClick={() => setIsGesture(!isGesture)}
          style={{
            position: 'fixed',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            width: '100px',
            height: '100px',
            borderRadius: '50% 0 0 50%',
            backgroundColor: 'rgba(255, 255, 100, 0.5)',
            boxShadow: '0 0 10px 1px rgba(255, 255, 255, 0.5)',
            color: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            border: 'none',
            zIndex: 100,
          }}>
          <b>Click me!</b>
        </button>
        <Header />
        <ContextMenu />
        <div className='App-body'>
          <Projects />
          <Interests />
          {/* <Achievements /> */}
        </div>
        {isGesture ? <HandsContainer /> : <></>}
        {isHowToHand ? (
          <HowToHand close={() => setIsHowToHand(false)} />
        ) : (
          <></>
        )}
      </div>
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
