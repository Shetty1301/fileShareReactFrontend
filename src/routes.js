// routes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Home';
import Upload from './components/Upload';
import About from './components/About';
import NavBar from './components/Navbar';
import NotFound from './components/NotFound';
import SignIn from './components/SignIn';
import Register from './components/Register';
import MyUploads from './components/MyUploads';
import { AuthContext } from './contexts/AuthContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

const Routing = () => {
  const images = {
    sample1: 'https://wallpapersmug.com/download/1920x1080/31df14/pixel-art-cityscape-buildings-new-york.jpg',
    sample2: 'https://t4.ftcdn.net/jpg/01/90/24/33/360_F_190243331_ROECdWvCaPuZI6g3X3ACDwvbgQ810kuI.jpg',
    sample3: 'https://wallpapergod.com/images/hd/pixel-art-1920X1080-wallpaper-8bnl3c6xbsilszl7.jpeg'
  };
  
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home heading="Welcome to the File Sharing App" btnText="Start Sharing 👉" />} />
          <Route path='/upload' element={<Upload />} />
          <Route path='/about' element={<About source={images.sample2} heading="About the App" />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/my-uploads' element={
            <ProtectedRoute>
              <MyUploads />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default Routing;