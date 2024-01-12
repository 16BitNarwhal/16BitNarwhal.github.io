import React from 'react';
import ProjectLayout from '../ProjectLayout';

const RPSClassifier = () => {
  return (
    <ProjectLayout
      project={{
        title: 'RPSClassifier',
        year: '2022',
        techStack: [
          'Python',
          'Tensorflow',
          'OpenCV',
          'MediaPipe',
          'Google Colab',
        ],
        github:
          'https://colab.research.google.com/drive/1-D4jFedYEzwr6TfzMKbCuz_f9xv2S-q4?usp=sharing#scrollTo=Cmna9-RHVY7q',
      }}>
      <h2>Overview</h2>
      <p style={{ textAlign: 'right' }}>
        <img
          src='../project/RPSClassifier/thumbnail.png'
          alt='RPS Classifier'
          height='200px'
          style={{ float: 'right', margin: '0 0.75rem' }}
        />
        The <b>🪨Rock 📄Paper ✂️Scissors Classifier</b> is a fun little project
        that I built when learning about computer vision and the MediaPipe
        library. It takes in an image of a hand and classifies it as rock,
        paper, or scissors. I also showed others how to build their own RPS
        Classifier in a workshop for my high school's computer science club.
      </p>
      <h2
        style={{
          clear: 'both',
        }}>
        Development
      </h2>
      <p>
        For data collection, I wrote a small script that runs the webcam and
        uses the MediaPipe library to detect the user's hand landmarks. I then
        stored the hand landmarks and the corresponding label (rock, paper, or
        scissors) in a CSV file. I collected over 100 samples for each label,
        when I then shuffeld and split into training and testing sets.
      </p>
      <p>
        I then used Google Colab and Tensorflow to create a dense neural
        network, with the first 3 layers having 64, 32 and 16 neurons (in that
        order), and the final layer having 3 neurons (one for each label). I
        used a softmax activation function for the final layer for a probability
        distribution and I used sparse categorical crossentropy for my loss
        function. The evaluated model had 99% accuracy on the testing set.
        However, since the model was trained on my hand and all the samples were
        collected in the same environment, I believe the model is overfit and
        would have a lower accuracy if used in a different environment.
      </p>
    </ProjectLayout>
  );
};

export default RPSClassifier;
