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
            './interests/climb/climb_1.jpg',
            './interests/climb/climb_2.jpg',
            './interests/climb/climb_3.jpg',
            './interests/climb/climb_4.gif',
            './interests/climb/climb_5.gif',
            './interests/climb/climb_6.gif',
            './interests/climb/climb_7.gif',
            './interests/climb/climb_8.gif',
          ]}
          hoverText='Rock Climbing'
        />
        <Interest
          images={[
            './interests/taekwondo/taekwondo_1.gif',
            './interests/taekwondo/taekwondo_2.gif',
            './interests/taekwondo/taekwondo_3.gif',
            './interests/taekwondo/taekwondo_4.jpg',
            './interests/taekwondo/taekwondo_5.jpg',
            './interests/taekwondo/taekwondo_6.jpg',
            './interests/taekwondo/taekwondo_7.jpg',
            './interests/taekwondo/taekwondo_8.gif',
            './interests/taekwondo/taekwondo_9.gif',
            './interests/taekwondo/taekwondo_10.jpg',
          ]}
          hoverText='Taekwondo'
        />
        <Interest
          images={['./interests/piano/piano_1.gif']}
          hoverText='Piano'
        />
        <Interest
          images={[
            './interests/percussion/percussion_1.gif',
            './interests/percussion/percussion_2.gif',
            './interests/percussion/percussion_3.jpg',
            './interests/percussion/percussion_4.jpg',
            './interests/percussion/percussion_5.jpg',
            './interests/percussion/percussion_6.jpg',
            './interests/percussion/percussion_7.jpg',
            './interests/percussion/percussion_8.gif',
          ]}
          hoverText='Percussion'
        />
        <Interest
          images={[
            './interests/skateboard/1.gif',
            './interests/skateboard/2.gif',
            './interests/skateboard/3.gif',
          ]}
          hoverText='Skateboarding'
        />
        <Interest
          images={[
            './interests/read/read_1.jpg',
            './interests/read/read_2.jpg',
            './interests/read/read_3.jpg',
          ]}
          hoverText='Reading'
        />
        <Interest
          images={['./interests/skipping/skipping_1.gif']}
          hoverText='Skipping'
        />
        <Interest
          images={[
            './interests/hackathon/1.jpg',
            './interests/hackathon/2.jpg',
            './interests/hackathon/3.jpg',
            './interests/hackathon/4.jpg',
          ]}
          hoverText='Hackathons'
        />
        <Interest images={['./interests/ski/ski_1.jpg']} hoverText='Skiing' />
        <Interest
          images={[
            './interests/creating/1.jpg',
            './interests/creating/2.jpg',
            './interests/creating/3.jpg',
            './interests/creating/4.gif',
            './interests/creating/5.gif',
          ]}
          hoverText='Creating'
        />
      </div>
    </div>
  );
};

export default Interests;
