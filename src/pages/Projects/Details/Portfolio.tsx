import React from 'react';
import ProjectLayout from '../ProjectLayout';

const Portfolio = () => {
  return (
    <ProjectLayout
      project={{
        title: 'Portfolio Site',
        year: '2024',
        techStack: ['React', 'Typescript', 'Computer Vision', 'MLKit'],
        github: 'https://github.com/16BitNarwhal/portfolio-site/',
      }}>
      <h2>Overview</h2>
      <p style={{ textAlign: 'right' }}>
        It's just this website! I built this site to showcase both who I am and
        what I've done. Also computer vision is cool 😎
      </p>
      <h2
        style={{
          clear: 'both',
        }}>
        Development
      </h2>
      <p>
        I used ML Kit's hand landmark detection to detect the position of a
        user's hand using their webcam. I took the mean of the landmarks
        corresponding to the palms and had the website cursor follow that point
        (scaled to the website's window size). I also used ML Kit's gesture
        recognition to detect when the user makes an open-hand, closed-hand, or
        ILY gesture to move, click, and activate the context menu. If I ever
        want to add my own custom gestures in the future, I would consider
        making a model in tensorflow/pytorch (similar to my RPS classifier
        project) and using that on the hand landmarked data instead of ML Kit's
        pre-made gesture recognition.
      </p>
    </ProjectLayout>
  );
};

export default Portfolio;
