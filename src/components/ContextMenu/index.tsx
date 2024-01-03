import React from 'react';
import ContextLink from './contextlink';

const ContextMenu = () => {
  return (
    <div
      id='context-menu'
      style={{
        position: 'fixed',
        display: 'flex',
        visibility: 'hidden',
        padding: '5px',
        flexDirection: 'column',
        gap: '5px',
        backgroundColor: '#fff',
        borderRadius: '10px',
      }}>
      <ContextLink href='#header' text='Top' />
      <ContextLink href='#projects' text='Projects' />
      <ContextLink href='#interests' text='Interests' />
      <ContextLink href='#achievements' text='Achievements' />
    </div>
  );
};

export default ContextMenu;
