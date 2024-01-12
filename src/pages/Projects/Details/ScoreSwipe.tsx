import React from 'react';
import ProjectLayout from '../ProjectLayout';

const ScoreSwipe = () => {
  return (
    <ProjectLayout
      project={{
        title: 'ScoreSwipe',
        year: '2023',
        techStack: ['Flutter (Dart)', 'Android', 'Computer Vision', 'SQLite'],
        github: 'https://www.github.com/16bitnarwhal/scoreswipe',
      }}>
      <h2>Overview</h2>
      <p>
        <b>ScoreSwipe</b> is a mobile app that allows users to navigate their
        sheet music with their face. It uses <b>computer vision</b> to detect
        the user's <b>facial landmarks</b> and then uses that data to scroll the
        sheet music. The app also allows users to upload their own music from a
        pdf, photos or by scanning sheet music directly with their camera.
      </p>
      <h2>Inspiration</h2>
      <p>
        One of my biggest hobbies is playing music 🎵. I've played the piano 🎹,
        saxophone 🎷, drums 🥁 and was part of both my high school jazz band and
        concert band as a drummer and percussionist. As a musician, I often need
        to flip pages of sheet music 📄 while playing, which can be difficult
        when both hands 🖐️ are preoccupied. Since I already read most of my
        sheet music digitally 📱, I thought it would be cool to be able to
        navigate my music by just moving my head 🤯. Also, to convert some of my
        physical music sheets digitally, I had to take photos with my phone,
        transfer it to my computer💻, edit them together in photoshop, and
        transfer it back to my phone or tablet to play (I know right, sounds
        like a hassle)! So, I wanted to make it easier for people to scan and
        crop their sheet music into a single file directly with their camera 📷.
        Hence, I made ScoreSwipe!
      </p>
      <h2>Development</h2>
      <div>
        <img
          src='project/scoreswipe/mlkit landmarks.png'
          height='150px'
          alt='ML Kit facial landmarks'
          style={{ float: 'left', margin: '0 0 1rem 1rem' }}
        />
        <span style={{ textAlign: 'left' }}>
          I developed the app using <b>Flutter</b> and <b>Dart</b>. For the
          facial landmark recognition, I used Google's ML Kit facial detection
          API to get facial orientation in the form of euler angles on the X, Y,
          Z axes. The <i>tilt</i> and <i>turn</i> features of the app use these
          euler angles to determine when to scroll / flip the page.
        </span>
      </div>
      <p>
        For storing scanned images, I used a combination of <b>SQLite</b> and
        local <b>FileIO</b> to store the user's music and metadata (like the
        title, last opened date, etc.). <br />I originally wanted to use only
        FileIO to store the files, but I had to store both a metadata file and
        pdf file and querying the metadata file was too slow. <br /> So, I
        switched to using SQLite for both the metadata and the pdf data storage.
        However, for large files, SQLite
      </p>
      <h2>In Action</h2>
      <div
        style={{
          margin: '1rem 0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
        }}>
        <img
          width='320px'
          src='project/scoreswipe/demo_create.gif'
          alt='ScoreSwipe demo'
        />
        <img
          width='320px'
          src='project/scoreswipe/demo_edit.gif'
          alt='ScoreSwipe demo'
        />
      </div>
    </ProjectLayout>
  );
};

export default ScoreSwipe;
