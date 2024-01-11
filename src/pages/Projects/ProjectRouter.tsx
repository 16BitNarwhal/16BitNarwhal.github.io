import React from 'react';
import { useParams } from 'react-router-dom';

import Error from './Error';

import ScoreSwipe from './Details/ScoreSwipe';
import VOffice from './Details/VOffice';
import Refashion from './Details/Refashion';
import RPSClassifier from './Details/RPSClassifier';

const Project = () => {
  const { id } = useParams<{ id: string }>();

  switch (id) {
    case 'scoreswipe':
      return <ScoreSwipe />;
    case 'voffice':
      return <VOffice />;
    case 'refashion':
      return <Refashion />;
    case 'rpsclassifier':
      return <RPSClassifier />;
    default:
      return <Error />;
  }
};

export default Project;
