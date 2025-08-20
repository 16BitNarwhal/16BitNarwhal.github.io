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
        backgroundColor: 'rgba(255, 255, 255, 0.99)',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.5)',
      }}>
      <h1>Welcome to my site!</h1>
      <h1>Use your hand to navigate!</h1>
      <p style={{ marginTop: '-15px' }}>
        Please accept camera permissions to try this out!
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontSize: '30px',
          gap: '20px',
        }}>
        <span>🤚Move Around</span>
        <span>✊Left Click</span>
      </div>
      <button
        onClick={close}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          fontWeight: 1000,
          fontSize: '50px',
        }}>
        X
      </button>
    </div>
  );
};

export default HowToHand;
