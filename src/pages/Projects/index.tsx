import React from 'react';
import ProjectCard from '../../components/ProjectCard';

const Projects = () => {
  return (
    <div id='projects'>
      <h1 id='header'>Projects</h1>
      <div
        className='projects-container'
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '60px 100px',
          margin: 'auto 20vw',
        }}>
        <ProjectCard
          project={{
            title: 'Score Swipe',
            image: 'project/scoreswipe/thumbnail.png',
            year: '2023',
          }}
        />
        <ProjectCard
          project={{
            title: 'VOffice',
            image: 'project/voffice/thumbnail.png',
            year: '2023',
          }}
        />
        <ProjectCard
          project={{
            title: 'Refashion',
            image: 'project/refashion/thumbnail.jpg',
            year: '2023',
          }}
        />
        <ProjectCard
          project={{
            title: 'RPSClassifier',
            image: 'project/rpsclassifier/thumbnail.png',
            year: '2022',
          }}
        />
      </div>
    </div>
  );
};

export default Projects;
