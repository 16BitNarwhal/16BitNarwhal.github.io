import React, { useEffect } from 'react';
import ProjectInterface from './projectinterface';
import { Link } from 'react-router-dom';
import './style.css';

interface ProjectLayoutProps {
  children: React.ReactNode;
  project: ProjectInterface;
}

const ProjectLayout = ({ children, project }: ProjectLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className='layout'
      style={{
        minHeight: '100%',
        backgroundColor: 'rgba(220, 220, 220, 0.5)',
        fontSize: '1.25rem',
      }}>
      <div className='project'>
        <div className='layout-header'>
          <span
            style={{
              color: '#333',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}>
            {project.title}
          </span>
          <br />
          <span
            style={{
              color: '#333',
            }}>
            {project.year}
          </span>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '20px',
            }}>
            {project.url ? (
              <a
                href={project.url}
                target='_blank'
                rel='noreferrer'
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '20px',
                }}>
                <img
                  className='clickable'
                  src='/play.png'
                  alt='demo'
                  height='50px'
                />
              </a>
            ) : (
              <> </>
            )}
            {project.github ? (
              <a
                href={project.github}
                target='_blank'
                rel='noreferrer'
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  padding: '20px',
                }}>
                <img
                  className='clickable'
                  src='/socials/github.png'
                  alt='github'
                  height='50px'
                />
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
              <img
                className='clickable'
                src='/close.png'
                alt='close'
                height='50px'
              />
            </Link>
          </div>
          <div
            style={{
              marginTop: '-20px',
              marginBottom: '20px',
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}>
            {project.techStack.map((tech, index) => (
              <p
                key={index}
                style={{
                  backgroundColor: '#333',
                  color: '#fff',
                  padding: '5px',
                  borderRadius: '5px',
                  margin: '0',
                  fontSize: '1.1rem',
                  flex: '1 0 auto',
                }}>
                {tech}
              </p>
            ))}
          </div>
        </div>
        <div className='layout-content'>{children}</div>
      </div>
    </div>
  );
};

export default ProjectLayout;
