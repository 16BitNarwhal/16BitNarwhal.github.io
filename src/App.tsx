import React, { useState, useEffect } from 'react';
import './App.css';

import Projects from './pages/Projects';
import Interests from './pages/Interests';
import ProjectRouter from './pages/Projects/ProjectRouter';

import HandsContainer from './components/Hand';
import ContextMenu from './components/ContextMenu';
import HowToHand from './components/HowToHand';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    // Remove any existing cursor rules
    try {
      for (let i = 0; i < stylesheet.cssRules.length; i++) {
        if (stylesheet.cssRules[i].cssText.includes('cursor: none')) {
          stylesheet.deleteRule(i);
          break;
        }
      }
    } catch (e) {
      // Ignore errors when accessing stylesheet rules
    }
    
    if (isGesture) {
      try {
        stylesheet.insertRule('* { cursor: none !important; }', 0);
        setIsHowToHand(true);
      } catch (e) {
        // Fallback if insertRule fails
        console.warn('Could not insert cursor rule:', e);
      }
    } else {
      setIsHowToHand(false);
    }
  }, [isGesture]);

  return (
    <BrowserRouter>
      <div id='paint-on'></div> {/* for paint effect */}
      <div className='App' onContextMenu={handleContextMenu}>
        <button
          onClick={() => setIsGesture(!isGesture)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: isGesture ? 'rgba(255, 100, 100, 0.8)' : 'rgba(100, 255, 100, 0.8)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            border: 'none',
            zIndex: 1000,
            fontSize: '24px',
            transition: 'all 0.3s ease',
            transform: 'scale(1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
          }}
          title={isGesture ? 'Disable hand tracking' : 'Enable hand tracking'}>
          {isGesture ? '✋' : '🤚'}
        </button>
        {isGesture && (
          <div
            style={{
              position: 'fixed',
              top: '90px',
              right: '20px',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: '#fff',
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              zIndex: 999,
              pointerEvents: 'none',
              animation: 'fadeIn 0.3s ease',
            }}>
            Hand tracking active
          </div>
        )}
        <ContextMenu />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/projects/:id' element={<ProjectRouter />} />
        </Routes>
        <HandsContainer 
          enabled={isGesture} 
          onDisable={() => setIsGesture(false)} 
        />
        {isHowToHand && isGesture ? (
          <HowToHand close={() => setIsHowToHand(false)} />
        ) : null}
      </div>
    </BrowserRouter>
  );
};

const Header = () => {
  return (
    <div id='header' className='App-header'>
      {/* headshot, when clicked/waved switches to 16bitnarwhal */}
      <h1
        style={{
          margin: 0,
        }}>
        Eric Zhang
      </h1>
      <p
        style={{
          margin: '20px',
        }}>
        Software Engineer, Creator, Learner
      </p>
      <div className='socials'>
        <a
          href='https://www.linkedin.com/in/eric-s-zhang/'
          target='_blank'
          rel='noreferrer'>
          <img
            src='socials/linkedin.png'
            alt='LinkedIn'
            className='clickable'
          />
        </a>
        <a
          href='https://github.com/16BitNarwhal/'
          target='_blank'
          rel='noreferrer'>
          <img src='socials/github.png' alt='GitHub' className='clickable' />
        </a>
        <a href='mailto:ericzh1616@gmail.com' target='_blank' rel='noreferrer'>
          <img src='socials/mail.png' alt='Email' className='clickable' />
        </a>
        <a
          href='https://www.instagram.com/16bitnarwhal/'
          target='_blank'
          rel='noreferrer'>
          <img
            src='socials/instagram.png'
            alt='Instagram'
            className='clickable'
          />
        </a>
        <a
          href='https://devpost.com/ericzh1616'
          target='_blank'
          rel='noreferrer'>
          <img src='socials/devpost.png' alt='Devpost' className='clickable' />
        </a>
        <a
          href='https://16bitnarwhal.itch.io/'
          target='_blank'
          rel='noreferrer'>
          <img src='socials/itchio.png' alt='Itch.io' className='clickable' />
        </a>
        <a
          href='https://codeforces.com/profile/16BitNarwhal'
          target='_blank'
          rel='noreferrer'>
          <img
            src='socials/codeforces.png'
            alt='Codeforces'
            className='clickable'
          />
        </a>
      </div>
    </div>
  );
};

const Main = () => {
  return (
    <div className='main'>
      <Header />
      <Projects />
      <Interests />
      {/* <Achievements /> */}
    </div>
  );
};

export default App;
