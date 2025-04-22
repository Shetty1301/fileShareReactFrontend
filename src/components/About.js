// About.js

import React from 'react';
import './About.css';


const About = (props) => {
  return (
    <div className='about-container'>
      <img className='background-image' src={props.source} alt='' />
      <h1 className='about-heading'>{props.heading}</h1>
      <div className='about-paras'>
        <p>
          This simple file sharing application allows users to upload files and generate a shareable download link.
        </p>
        <br />
        <p>
          The app is built using React and NodeJs, Express server and MongoDB database, basically MERN stack. It implements react props, states, router, hooks, api, etc.
        </p>
      </div>
    </div>
  );
};

About.defaultProps={
  source: 'https://i.redd.it/7zx10hr273pb1.jpg',
  heading: 'About Section '
}
export default About;
