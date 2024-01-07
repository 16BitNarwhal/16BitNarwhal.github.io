import React from 'react';
import ProjectLayout from '../ProjectLayout';

const ScoreSwipe = () => {
  return (
    <ProjectLayout
      project={{
        title: 'ScoreSwipe',
        year: '2021',
        techStack: ['Flutter (Dart)', 'Android', 'Computer Vision', 'SQLite'],
        github: 'https://www.github.com/16bitnarwhal/scoreswipe',
      }}>
      ScoreSwipe is a mobile app that allows users to navigate their sheet music
      with their face. It uses computer vision to detect the user's facial
      landmarks and then uses that data to scroll the sheet music. The app
      allows users to upload their own music from a pdf, photos or by scanning
      sheet music directly with their camera.
      {/* some screenshots, video */}
    </ProjectLayout>
  );
};

export default ScoreSwipe;
