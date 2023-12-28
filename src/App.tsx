import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [contextMenuActive, setContextMenuActive] = useState(false);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();

    const contextMenu = document.getElementById('context-menu');
    if (contextMenu) {
      let x = e.clientX;
      let y = e.clientY;

      // Adjust if off screen right
      if (x + contextMenu.offsetWidth > window.innerWidth) {
        x = window.innerWidth - contextMenu.offsetWidth;
      }

      // Adjust if off screen bottom
      if (y + contextMenu.offsetHeight > window.innerHeight) {
        y = window.innerHeight - contextMenu.offsetHeight;
      }

      if (contextMenuActive) {
        contextMenu.style.visibility = 'hidden';
      } else {
        contextMenu.style.visibility = 'visible';
        contextMenu.style.position = 'absolute';
        contextMenu.style.left = `${x}px`;
        contextMenu.style.top = `${y}px`;
      }
      setContextMenuActive(!contextMenuActive);
    }
  };

  return (
    <div className='App' onContextMenu={handleContextMenu}>
      <Header />
      <body>
        <MouseControl />
        <div
          id='context-menu'
          style={{ display: 'block', visibility: 'hidden' }}>
          Hello World!!!
        </div>
      </body>
    </div>
  );
};

const Header = () => {
  return (
    <header className='App-header'>
      {/* headshot, when clicked/waved switches to 16bitnarwhal */}
      <h1>Eric Zhang</h1>
      <p>Software Engineer, Creator, Learner</p>
    </header>
  );
};

const MouseControl = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const updateCursorPosition = (e: MouseEvent) => {
    setCursorPosition({
      x: e.clientX + window.scrollX,
      y: e.clientY + window.scrollY,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  const simulateLeftClick = () => {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: cursorPosition.x,
      clientY: cursorPosition.y,
    });
    document
      .elementFromPoint(cursorPosition.x, cursorPosition.y)
      ?.dispatchEvent(clickEvent);
  };

  return <></>;
};

export default App;
