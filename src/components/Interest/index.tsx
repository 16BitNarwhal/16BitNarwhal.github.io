import React, { useState, useEffect } from 'react';
import './style.css';

interface InterestProps {
  images: string[];
  link?: string;
  hoverText: string;
  minWait?: number;
  waitRange?: number;
}

const Interest = ({
  images,
  link,
  hoverText,
  minWait,
  waitRange,
}: InterestProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (minWait === undefined) minWait = 10000;
    if (waitRange === undefined) waitRange = 10000;
    const wait = Math.floor(Math.random() * waitRange!) + minWait!;
    setTimeout(() => {
      const newIndex = Math.floor(Math.random() * images.length);
      if (newIndex === index) {
        if (newIndex === images.length - 1) setIndex(0);
        else setIndex(newIndex + 1);
        return;
      }
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
