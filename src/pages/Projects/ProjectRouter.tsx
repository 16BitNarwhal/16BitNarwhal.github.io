import React from 'react';
import { useParams } from 'react-router-dom';

import ScoreSwipe from './Details/ScoreSwipe';

const Project = () => {
  const { id } = useParams<{ id: string }>();

  switch (id) {
    case 'scoreswipe':
      return <ScoreSwipe />;
    default:
      return <div>404: Project Not Found!</div>;
  }
};

export default Project;
