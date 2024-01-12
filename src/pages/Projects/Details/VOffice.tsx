import React from 'react';
import ProjectLayout from '../ProjectLayout';

const VOffice = () => {
  return (
    <ProjectLayout
      project={{
        title: 'VOffice',
        year: '2023',
        techStack: ['Unity (C#)', 'AWS', 'OpenAI'],
        github: 'https://github.com/16BitNarwhal/Innovation-Challenge',
      }}>
      <h2>Overview</h2>
      <p
        style={{
          textAlign: 'left',
        }}>
        <img
          style={{
            float: 'left',
            margin: '0 .75rem',
            height: '200px',
          }}
          src='../project/voffice/1.png'
          alt='VOffice'
        />
        <b>VOffice</b> is a virtual reality office environment designed for
        collaborative work and comes with AI-Powered Advisors to help you with
        financial and other business decisions. VOffice was the first place🥇
        prize winner at the{' '}
        <a href='https://uwaterloo.ca/events/events/velocity-presents-innovation-challenge-imagining-future'>
          Velocity Reimagining the Future of Finance hackathon
        </a>
      </p>
      <h2
        style={{
          clear: 'both',
        }}>
        Inspiration
      </h2>
      <p>
        The project started when my team and I were participating in{' '}
        <a href='https://uwaterloo.ca/events/events/velocity-presents-innovation-challenge-imagining-future'>
          Velocity's Reimagining the Future of Finance hackathon
        </a>{' '}
        in September. The hackathon was sponsored by BMO, Unity, and Rogers. The
        challenge was to assist future generations with financial literacy💵.
        Many ideas led to educating finance through video games🕹️, but we wanted
        to build a usable tool🔧 rather than an educational game. So, we came up
        with VOffice, a platform that allows you to collaborate with your
        coworkers in real time in a VR environment, and seek advice from
        AI-Powered Advisors🤖.
      </p>
      <h2>Development</h2>
      <p>
        For the graphics, we used the 3D Unity Editor. We found some premade
        assets online, given our limited experience with 3D modelling, and we
        put them together to create our office environment. We made most of our
        objects interactable, and for an extra-fun experience, we included a
        couple of easter eggs.
      </p>
      <p>
        For our backend, we used C# and we scripted in the integrated Visual
        Studio IDE. We integrated OpenAI APIs, including text completion and
        Whisper speech-to-text, in order to power our advisors. In order to be
        able to make our advisors speak their <b>LLM-powered</b> thoughts, we
        utilized Amazon Web Service's (AWS) Polly model.
      </p>
    </ProjectLayout>
  );
};

export default VOffice;
