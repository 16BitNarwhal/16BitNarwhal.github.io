import React from 'react';
import './style.css';

type HowToHandProps = {
  close: () => void;
};

const HowToHand: React.FC<HowToHandProps> = ({ close }) => {
  return (
    <div
      className='how-to-hand'
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        border: '1px solid #000000',
        color: '#000000',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
      <h1 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: 'normal' }}>
        Welcome to my site!
      </h1>
      <h2 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: 'normal' }}>
        Use your hand to navigate! <br />
        (move your mouse to exit hand tracking)
      </h2>
      <p style={{ margin: '0 0 20px 0', fontSize: '1rem' }}>
        Please accept camera permissions to try this out!
      </p>
      <p style={{ margin: '0 0 20px 0', fontSize: '0.9rem', opacity: 0.7 }}>
        ⏱️ Mouse movement won't disable hand tracking for the first 3 seconds
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '1.1rem',
          gap: '15px',
          marginBottom: '20px',
        }}>
        <span>🤚 Move Around</span>
        <span>👆 Left Click</span>
      </div>
      <button
        onClick={close}
        style={{
          position: 'absolute',
          top: '10px',
          right: '15px',
          backgroundColor: '#ffffff',
          border: '1px solid #000000',
          borderRadius: '4px',
          width: '30px',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#000000',
          transition: 'all 0.2s ease',
        }}>
        ×
      </button>
    </div>
  );
};

export default HowToHand;
