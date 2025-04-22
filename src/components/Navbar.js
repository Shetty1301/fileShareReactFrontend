// components/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const NavBar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul className="nav-left">
        <li className='nav-items'>
          <Link to='/'>Home</Link>
        </li>
        <li className='nav-items'>
          <Link to='/upload'>Upload File</Link>
        </li>
        <li className='nav-items'>
          <Link to='/about'>About</Link>
        </li>
        {isAuthenticated && (
          <li className='nav-items'>
            <Link to='/my-uploads'>My Uploads</Link>
          </li>
        )}
      </ul>
      <ul className="nav-right">
        {isAuthenticated ? (
          <>
            <li className='nav-items user-info'>
              <span>Hello, {user.username}</span>
            </li>
            <li className='nav-items'>
              <button className="logout-btn" onClick={logout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li className='nav-items'>
              <Link to='/signin'>Sign In</Link>
            </li>
            <li className='nav-items'>
              <Link to='/register'>Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;