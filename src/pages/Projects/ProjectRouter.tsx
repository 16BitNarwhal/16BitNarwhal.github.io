import React from 'react';
import { useParams } from 'react-router-dom';

import Error from './Error';

import ScoreSwipe from './Details/ScoreSwipe';

const Project = () => {
  const { id } = useParams<{ id: string }>();

  switch (id) {
    case 'scoreswipe':
      return <ScoreSwipe />;
    default:
      return <Error />;
  }
};

export default Project;
