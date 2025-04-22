// Home.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = (props) => {
  const navigate = useNavigate();
  return (
    <>
    <div className='home-container'>
      <h1 className='home-heading'>{props.heading}</h1>
      <p className='home-para'>Upload your files and generate download links instantly.</p>
      {/* <img
        src="https://i.pinimg.com/originals/16/46/24/1646243661201a0892cc4b1a64fcbacf.jpg"
        alt="file sharing"
        style={{ width: '400px', marginTop: '20px' }}
      /> */}
      <button className='go-to-uploads' onClick={()=>{navigate('/upload')}}><span>{props.btnText}</span></button>
      
    </div>
    
    </>
  );
};

Home.defaultProps={
  heading: 'App Heading',
  btnText: 'Click Me'
}

export default Home;
