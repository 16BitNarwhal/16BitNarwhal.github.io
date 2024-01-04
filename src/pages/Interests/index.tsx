import React, { useEffect, useState } from 'react';
import Interest from '../../components/Interest';

const Interests = () => {
  const [containerWidth, setContainerWidth] = useState('0px');

  useEffect(() => {
    const widthInPixels = Math.max(
      250,
      250 * Math.floor((window.innerWidth * 0.6) / 250)
    );
    setContainerWidth(`${widthInPixels}px`);
  }, []);

  return (
    <div
      id='interests'
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0',
      }}>
      <h1 id='header'>Interests</h1>
      <div
        id='interests-container'
        style={{
          display: 'grid',
          gap: '0',
          justifyContent: 'center',
          gridAutoRows: '250px',
          gridTemplateColumns: 'repeat(auto-fit, 250px)',
          width: containerWidth,
          overflow: 'hidden',
          borderRadius: '50px',
          boxShadow: '0 0 15px 5px rgba(0, 0, 0, 0.3)',
        }}>
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/310/200',
            'https://picsum.photos/200/400',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='A'
        />
      </div>
    </div>
  );
};

export default Interests;
