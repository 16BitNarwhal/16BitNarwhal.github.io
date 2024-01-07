import React, { useEffect } from 'react';
import ProjectInterface from './projectinterface';
import { Link } from 'react-router-dom';

interface ProjectLayoutProps {
  children: React.ReactNode;
  project: ProjectInterface;
}

const ProjectLayout = ({ children, project }: ProjectLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div id='layout'>
      <div id='layout-header'>
        <h1>{project.title}</h1>
        <p>{project.year}</p>
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: '20px',
          }}>
          {project.url ? (
            <a
              href={project.url}
              rel='noreferrer'
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '20px',
              }}>
              <img src='/play.png' alt='demo' height='50px' />
            </a>
          ) : (
            <> </>
          )}
          {project.github ? (
            <a
              href={project.github}
              rel='noreferrer'
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                padding: '20px',
              }}>
              <img src='/github.png' alt='github' height='50px' />
            </a>
          ) : (
            <> </>
          )}
          <Link
            to='/'
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              padding: '20px',
            }}>
            <img src='/close.png' alt='close' height='50px' />
          </Link>
        </div>
        <div
          style={{
            marginTop: '-20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
          }}>
          {project.techStack.map((tech, index) => (
            <p
              key={index}
              style={{
                backgroundColor: '#333',
                color: '#fff',
                padding: '5px',
                borderRadius: '5px',
                margin: '0 5px',
              }}>
              {tech}
            </p>
          ))}
        </div>
      </div>
      <div id='layout-content'>{children}</div>
    </div>
  );
};

export default ProjectLayout;