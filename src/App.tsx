import React, { useState, useEffect } from 'react';
import './App.css';



import HandsContainer from './components/Hand';

import HowToHand from './components/HowToHand';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const [isGesture, setIsGesture] = useState(false);
  const [isHowToHand, setIsHowToHand] = useState(false);

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
      <div className='App'>
        <button
          onClick={() => setIsGesture(!isGesture)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: isGesture ? '#000000' : '#ffffff',
            color: isGesture ? '#ffffff' : '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            border: '1px solid #000000',
            zIndex: 1000,
            fontSize: '20px',
            transition: 'all 0.2s ease',
          }}
          title={isGesture ? 'Disable hand tracking' : 'Enable hand tracking'}>
          {isGesture ? '✋' : '🤚'}
        </button>
        {isGesture && (
          <div
            style={{
              position: 'fixed',
              top: '80px',
              right: '20px',
              color: '#000000',
              fontSize: '12px',
              zIndex: 999,
              pointerEvents: 'none',
              opacity: 0.7,
            }}>
            Hand tracking active
          </div>
        )}

        <Routes>
          <Route path='/' element={<Main />} />
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '0px' }}>
        <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: 'normal' }}>
          Eric Zhang
        </h1>
        <div className='socials' style={{ display: 'flex', gap: '8px' }}>
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
      <p style={{ margin: '0 0 20px 0', fontSize: '1rem' }}>
        Software Engineer, Creator, Learner
      </p>
    </div>
  );
};

const Main = () => {
  return (
    <div className='main'>
      <Header />
    </div>
  );
};

export default App;
