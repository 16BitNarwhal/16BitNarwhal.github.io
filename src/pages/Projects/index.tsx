import React from 'react';
import ProjectCard from '../../components/ProjectCard';

const Projects = () => {
  return (
    <div id='projects'>
      <h1 id='header'>Projects</h1>
      {/* TODO: fill out sample ProjectCards */}
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
            image: 'https://picsum.photos/200/300',
            year: '2023',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            year: '2021',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            year: '2021',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            year: '2021',
          }}
        />
        <ProjectCard
          project={{
            title: 'Project 1',
            image: 'https://picsum.photos/200/300',
            year: '2021',
          }}
        />
      </div>
    </div>
  );
};

export default Projects;
