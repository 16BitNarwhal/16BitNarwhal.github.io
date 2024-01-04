import React, { useState, useEffect } from 'react';
import './style.css';

interface InterestProps {
  images: string[];
  link?: string;
  hoverText: string;
}

const Interest: React.FC<InterestProps> = ({ images, link, hoverText }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const wait = Math.floor(Math.random() * 10000) + 3000;
    setTimeout(() => {
      const newIndex = Math.floor(Math.random() * images.length);
      const newImage = images[newIndex];
      setIndex(newIndex);
    }, wait);
  }, [index]);

  return (
    <div
      className='interest'
      style={{
        position: 'relative',
        backgroundImage: `url(${images[index]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
        transition: 'background-image 1s ease-in-out',
      }}>
      <div
        className='interest-hover clickable'
        style={{
          animation: 'none',
        }}>
        {link ? (
          <a href={link} target='_blank' rel='noopener noreferrer'>
            {hoverText}
          </a>
        ) : (
          hoverText
        )}
      </div>
    </div>
  );
};

export default Interest;
