import React, { useState } from 'react';
import ProjectDetails from './projectdetails';
import Project from './projectinterface';

const ProjectCard = ({ project }: { project: Project }) => {
  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const handleCardClick = () => {
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  return (
    <>
      <div
        className='project-card clickable'
        style={{
          border: '2px solid #ddd',
          borderRadius: '10px',
          padding: '10px',
          margin: '10px',
          cursor: 'pointer',
          transition: 'transform 0.2s',
          overflow: 'hidden',
          width: '300px',
          alignSelf: project.alignment == 'left' ? 'flex-start' : 'flex-end',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.3)',
        }}
        onClick={handleCardClick}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px 8px 0 0',
            maxHeight: '200px',
            objectFit: 'cover',
          }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 10px',
            margin: '-10px 0',
          }}>
          <h3
            style={{
              textAlign: 'center',
              color: '#333',
            }}>
            {project.title}
          </h3>
          <p
            style={{
              textAlign: 'center',
              color: '#666',
            }}>
            {project.year}
          </p>
        </div>
      </div>
      {isDetailsOpen && (
        <ProjectDetails project={project} onClose={handleDetailsClose} />
      )}
    </>
  );
};

export default ProjectCard;
