import React from 'react';

interface ContextLinkProps {
  href: string;
  text: string;
}

const ContextLink = ({ href, text }: ContextLinkProps) => {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(e.currentTarget.hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className='clickable'
      style={{
        textDecoration: 'none',
        color: '#333',
      }}>
      <div
        className='context-link clickable'
        style={{
          textAlign: 'center',
          cursor: 'pointer',
          fontWeight: 'bold',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '5px',
          boxShadow: '0 0 15px 1px rgba(0, 0, 0, 0.5)',
        }}>
        {text}
      </div>
    </a>
  );
};

export default ContextLink;
