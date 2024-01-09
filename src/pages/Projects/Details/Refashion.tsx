import React from 'react';
import ProjectLayout from '../ProjectLayout';

const Refashion = () => {
  return (
    <ProjectLayout
      project={{
        title: 'Refashion',
        year: '2023',
        techStack: [
          'Raspberry PI (Python)',
          'Computer Vision',
          'MongoDB',
          'Firebase',
          'Flutter (Dart)',
          'OpenAI',
          'AWS',
        ],
        github: 'https://git.uwaterloo.ca/e256zhan/refashion/-/tree/main',
      }}>
      <h2>Overview</h2>
      <p style={{ textAlign: 'right' }}>
        <img
          src='/project/refashion/thumbnail.jpg'
          alt='Refashion'
          height='200px'
          style={{ float: 'right', margin: '0 .75rem' }}
        />
        <b>Refashion</b> is a smart mirror that uses computer vision to capture
        your outfit and give you outfit recommendations based on the weather and
        your calendar events. It also allows you to save your outfits and view
        them later through a mobile app on your phone.
      </p>
      <h2>Inspiration</h2>
      <p>
        Refashion is a project that my team and I built for our SE101 Course
        (Introduction to Methods of Software Engineering). The goal of the
        project was to build anything using a Raspberry PI. We wanted to build
        something that we could actually use, and we thought it would be cool to
        have a smart mirror🪞 that could recommend you outfits👔 and reduce the
        time you spend picking out your clothes in the morning. Also, smart
        mirrors are cool😎!
      </p>
      <h2>Demo Video</h2>
      <div style={{ maxWidth: '640px', margin: 'auto' }}>
        <div
          style={{
            position: 'relative',
            paddingBottom: '56.25%',
            height: '0',
            overflow: 'hidden',
          }}>
          <iframe
            src='https://uofwaterloo-my.sharepoint.com/personal/r23nguye_uwaterloo_ca/_layouts/15/embed.aspx?UniqueId=9f120682-31cd-4258-84c5-bf22121f1c3a&embed=%7B%22hvm%22%3Atrue%2C%22ust%22%3Atrue%7D&referrer=StreamWebApp&referrerScenario=EmbedDialog.Create'
            width='640'
            height='360'
            title='ReFashion Demo.mp4'
            style={{
              border: 'none',
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              height: '100%',
              maxWidth: '100%',
            }}></iframe>
        </div>
      </div>
    </ProjectLayout>
  );
};

export default Refashion;
