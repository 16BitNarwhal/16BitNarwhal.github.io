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
          minWait={1000}
          waitRange={0}
          images={[
            './interests/climb/climb_1.jpg',
            './interests/climb/climb_2.jpg',
            './interests/climb/climb_3.jpg',
            './interests/climb/climb_4.jpg',
            './interests/climb/climb_5.jpg',
          ]}
          hoverText='Rock Climbing'
        />
        <Interest
          images={[
            './interests/taekwondo/taekwondo_1.gif',
            './interests/taekwondo/taekwondo_2.gif',
            './interests/taekwondo/taekwondo_3.gif',
          ]}
          minWait={3000}
          waitRange={3000}
          hoverText='Taekwondo'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Piano'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Percussion'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Skateboarding'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Reading'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Skipping'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Hackathons'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Skiing'
        />
        <Interest
          images={[
            'https://picsum.photos/200/200',
            'https://picsum.photos/200/300',
            'https://picsum.photos/300/200',
          ]}
          hoverText='Making'
        />
      </div>
    </div>
  );
};

export default Interests;
