import React from 'react';
import { useParams } from 'react-router-dom';

import Error from './Error';

import ScoreSwipe from './Details/ScoreSwipe';
import VOffice from './Details/VOffice';
import Refashion from './Details/Refashion';
import RPSClassifier from './Details/RPSClassifier';
import Genetic from './Details/Genetic';
import Portfolio from './Details/Portfolio';

const Project = () => {
  const { id } = useParams<{ id: string }>();

  switch (id) {
    case 'portfolio':
      return <Portfolio />;
    case 'scoreswipe':
      return <ScoreSwipe />;
    case 'voffice':
      return <VOffice />;
    case 'refashion':
      return <Refashion />;
    case 'rpsclassifier':
      return <RPSClassifier />;
    case 'genetic':
      return <Genetic />;
    default:
      return <Error />;
  }
};

export default Project;
