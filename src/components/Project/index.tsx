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
    <div
      className='project-card'
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
      <h3 style={{ textAlign: 'center', margin: '10px 0', color: '#333' }}>
        {project.title}
      </h3>
      {isDetailsOpen && (
        <ProjectDetails project={project} onClose={handleDetailsClose} />
      )}
    </div>
  );
};

export default ProjectCard;
