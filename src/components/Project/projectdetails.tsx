import React, { useState, useEffect } from 'react';

interface Project {
  title: string;
  image: string;
  description: string;
  url: string;
  github: string;
  techStack: string[];
  alignment: 'left' | 'right';
}

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

const ProjectDetails = ({ project, onClose }: ProjectDetailsProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    console.log('mounted');

    return () => {
      setIsVisible(false);
      console.log('unmounted');
    };
  }, []);

  return (
    <>
      <div
        className={`project-details`}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: `translate(${isVisible ? '-50%, -50%' : '-50%, 50%'})`,
          width: '80%',
          height: '80%',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '10px',
          border: '2px solid #ddd',
          transition: 'transform 0.2s',
          transformOrigin: 'center',
        }}>
        <div>
          <h2>{project.title}</h2>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(() => {
              onClose();
            }, 200);
          }}
          style={{
            marginTop: '20px',
          }}>
          Close
        </button>
      </div>
    </>
  );
};

export default ProjectDetails;
