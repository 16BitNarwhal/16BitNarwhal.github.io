import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import Projects from './pages/Projects';
import Interests from './pages/Interests';
import Achievements from './pages/Achievements';
import ProjectRouter from './pages/Projects/ProjectRouter';

import HandsContainer from './components/Hand';
import ContextMenu from './components/ContextMenu';
import HowToHand from './components/HowToHand';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

const App = () => {
  const [contextMenuActive, setContextMenuActive] = useState(false);
  const [isGesture, setIsGesture] = useState(true);
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
    if (isGesture) {
      stylesheet.insertRule('* { cursor: none !important; }');
      setIsHowToHand(true);
    }
  }, [isGesture]);

  return (
    <BrowserRouter>
      <div id='paint-on'></div> {/* for paint effect */}
      <div className='App' onContextMenu={handleContextMenu}>
        {!isGesture ? (
          <button
            onClick={() => setIsGesture(true)}
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
        ) : (
          <></>
        )}
        <ContextMenu />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/projects/:id' element={<ProjectRouter />} />
        </Routes>
        <HandsContainer />
        {isHowToHand ? (
          <HowToHand close={() => setIsHowToHand(false)} />
        ) : (
          <></>
        )}
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
