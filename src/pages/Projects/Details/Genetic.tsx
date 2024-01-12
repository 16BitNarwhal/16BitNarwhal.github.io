import React from 'react';
import ProjectLayout from '../ProjectLayout';

const Genetic = () => {
  return (
    <ProjectLayout
      project={{
        title: 'Simple Genetic Algorithm',
        year: '2022',
        techStack: [
          'Processing (Java)',
          'Neural Networks',
          'Genetic Algorithms',
          'Python',
          'Matplotlib',
        ],
        github: 'https://github.com/16BitNarwhal/FirstGeneticAlgorithm/',
      }}>
      <h2>Overview</h2>
      <p style={{ textAlign: 'right' }}>
        <img
          src='project/genetic/two_corners.gif'
          alt='Genetic'
          height='300px'
          style={{ float: 'right', margin: '0 0.75rem' }}
        />
        This is a simple genetic algorithm that I built to practice my knowledge
        about neural networks and genetic algorithms. It is a simple program
        that trains dots to reach a goal (some area on the screen) by using a
        neural network trained through evolution. I was inspired to build this
        after watching this{' '}
        <a href='https://www.youtube.com/watch?v=N3tRFayqVtk'>
          video on programming evolution by davidrandallmiller
        </a>
      </p>
      <h2
        style={{
          clear: 'both',
        }}>
        How it works
      </h2>
      <p>
        The dots have input/sensor neurons for their location and an oscillating
        neuron to detect cyclic behavior. The output neurons represent a simple
        movement in the X and Y direction. Additionally, the system incorporates
        hidden neurons which connect to all the input and output neurons. The
        connections are referred to as "genes", which play a crucial role in
        decision-making and guiding the movement of the dots. The terminology
        "gene" is used here for simplicity, though it may not be the most
        accurate term. In the initial setup, each dot is assigned 32 genomes and
        16 hidden neurons, though there is consideration that the number of
        hidden neurons might be excessive. Each generation in the simulation
        spans 210 steps or frames. The objective for the dots is to reach a
        specific location within this timeframe to ensure their continuation
        into subsequent generations. This selection process is governed by the{' '}
        <i>naturalSelection()</i> method in the Body.pde file. At the end of
        each generation, the dots that "don't survive" (stay red) are deleted.
        Then starts a new generation of dots, inheriting the surviving
        characteristics from a randomly selected survivor of the previous
        generation. There is also a 1% chance of mutation in each new dot, where
        a gene undergoes a significant alteration such as a genome being
        rearranged or having a different weighting. The success of the dots in
        reaching the target location is observed over several hundred
        generations until the dots are able to reach the target location.
      </p>
      <p>
        I also made a save/load feature that allows you to save the current
        generation of networks and load them back in later, which allowed me to
        save the network that you see above. I also use matplotlib and NetworkX
        to visualize this saved network.
        <img
          src='project/genetic/vis_network.png'
          alt='Network Visualization'
          height='400px'
        />
      </p>
      <h2>Results</h2>
      <p
        style={{
          textAlign: 'left',
        }}>
        <img
          src='project/genetic/circle.gif'
          alt='More Complex Task'
          height='300px'
          style={{
            float: 'left',
            margin: '0 0.75rem',
          }}
        />
        On certain tasks (such as the one shown in the gif on the left), most of
        the dots are able to reach the target location within a few generations.
        However, on more complex tasks (such as the one shown in the gif below),
        the dots end up stuck in a local minimum and are unable to reach the
        circle in the middle. This is because the dots learned to move in the
        fashion you see below that lets at least some dots reach the target.
      </p>
    </ProjectLayout>
  );
};

export default Genetic;
