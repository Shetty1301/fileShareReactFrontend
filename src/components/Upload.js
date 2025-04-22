// components/Upload.js
import React, { useState, useRef, useContext } from 'react';
import { uploadFile } from '../service/api';
import { AuthContext } from '../contexts/AuthContext';
import './Upload.css';
// Add this import
import LinkDisplay from './LinkDisplay';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [alias, setAlias] = useState('');
  const [password, setPassword] = useState('');
  const [downloadLimit, setDownloadLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef();
  const { user } = useContext(AuthContext);

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Add optional parameters if provided
      if (alias) formData.append('alias', alias);
      if (password) formData.append('password', password);
      formData.append('downloadLimit', downloadLimit);
      
      // Add user email if logged in
      if (user && user.email) {
        formData.append('email', user.email);
      }

      const response = await uploadFile(formData);
      setResult(response);
    } catch (error) {
      setError(error.error || 'Failed to upload file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='upload-container'>
      {/* <video 
        className="background-video" 
        autoPlay 
        loop 
        muted 
        preload="auto"
        playsInline 
      >
        <source src={backgroundVideo} type="video/mp4"/>
        Your browser does not support the video tag.
      </video> */}

      <div className='content-box'>
        <h1 className='upload-heading'>Upload Your File</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="file-input-container">
            <button type="button" className='upload-button' onClick={onUploadClick}>
              <span>{file ? file.name : 'Select File to Upload'}</span>
            </button>
            <input
              type='file'
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="alias">Custom Alias (Optional)</label>
            <input
              type="text"
              id="alias"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="Leave blank for random alias"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password Protection (Optional)</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank for no password"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="downloadLimit">Download Limit</label>
            <input
              type="number"
              id="downloadLimit"
              value={downloadLimit}
              onChange={(e) => setDownloadLimit(e.target.value)}
              min="1"
              max="100"
            />
          </div>
          
          <button type="submit" className='upload-button' disabled={loading}>
            <span>{loading ? 'Uploading...' : 'Upload File'}</span>
          </button>
        </form>
        
        {/* Replace your result div with the LinkDisplay component */}
        {result && (
          <LinkDisplay link={result.download_link} password={password} />
        )}
      </div>
      {/* <a className='credits' href="https://www.vecteezy.com/free-videos/rectangle">Rectangle Stock Videos by Vecteezy</a> */}
    </div>
  );
};

export default Upload;