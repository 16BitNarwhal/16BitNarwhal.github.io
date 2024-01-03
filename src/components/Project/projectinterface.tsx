interface Project {
  title: string;
  image: string;
  description: string;
  url: string;
  github: string;
  techStack: string[];
  alignment: 'left' | 'right';
}

export default Project;