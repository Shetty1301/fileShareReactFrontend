import React, { useState, useEffect } from 'react';
import { getUserFiles, deleteFile } from '../service/api';
import './MyUploads.css';

const MyUploads = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const response = await getUserFiles();
      setFiles(response.files);
      setError('');
    } catch (error) {
      setError('Failed to load your files. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileId, filePath) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        await deleteFile(fileId, filePath);
        // Remove the file from state
        setFiles(files.filter(file => file.id !== fileId));
      } catch (error) {
        setError('Failed to delete file. Please try again.');
        console.error(error);
      }
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Download link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="my-uploads-container">
        <div className="loading">Loading your files...</div>
      </div>
    );
  }

  return (
    <div className="my-uploads-container">
      <div id='spacers'></div>
      <h1>My Uploaded Files</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      {files.length === 0 ? (
        <div className="no-files">
          <p>You haven't uploaded any files yet.</p>
        </div>
      ) : (
        <div className="files-grid">
          {files.map(file => (
            <div className="file-card" key={file.id}>
              <div className="file-header">
                <h3 title={file.original_filename}>{file.original_filename}</h3>
                <button 
                  className="delete-btn" 
                  onClick={() => handleDelete(file.id, file.file_path)}
                  title="Delete file"
                >
                  ×
                </button>
              </div>
              
              <div className="file-details">
                <p><strong>Alias:</strong> {file.alias}</p>
                <p><strong>Downloads:</strong> {file.download_count}/{file.download_limit}</p>
                <p><strong>Size:</strong> {Math.round(file.file_size / 1024)} KB</p>
                <p><strong>Expires:</strong> {new Date(file.expires_at).toLocaleDateString()}</p>
              </div>
              
              <div className="file-actions">
                <a 
                  href={file.download_link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="download-link"
                >
                  Download
                </a>
                <button 
                  className="copy-link-btn" 
                  onClick={() => copyToClipboard(file.download_link)}
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyUploads;
