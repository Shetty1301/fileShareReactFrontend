import React, { useRef } from 'react';
import QRCode from 'react-qr-code';
import './LinkDisplay.css';

const LinkDisplay = ({ link, password }) => {
  const qrRef = useRef();

  // Function to download QR code as PNG image
  const downloadQRCode = () => {
    // Create a temporary canvas
    const canvas = document.createElement("canvas");
    const svg = qrRef.current.querySelector("svg");
    
    // Get SVG dimensions
    const svgWidth = svg.width.baseVal.value;
    const svgHeight = svg.height.baseVal.value;
    
    // Set canvas dimensions to match SVG
    canvas.width = svgWidth;
    canvas.height = svgHeight;
    
    // Create image from SVG
    const img = new Image();
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    img.onload = () => {
      const ctx = canvas.getContext("2d");
      
      // Fill background if needed
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw image
      ctx.drawImage(img, 0, 0);
      
      // Create download link
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "download-qr-code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up
      URL.revokeObjectURL(svgUrl);
    };
    
    img.src = svgUrl;
  };

  return (
    <div className="link-display">
      <h3>File Uploaded Successfully!</h3>
      <div className="link-text">
        <p><strong>Download Link:</strong></p>
        <a href={link} target='_blank' rel='noopener noreferrer'>
          {link}
        </a>
      </div>
      
      {password && (
        <p><strong>Password:</strong> {password}</p>
      )}
      
      <div className="qr-container">
        <p><strong>Scan QR Code:</strong></p>
        <div className="qr-code" ref={qrRef}>
          <QRCode value={link} size={150} bgColor="rgba(0, 0, 0, 0.4)" fgColor="aquamarine" />
        </div>
        <p className="qr-instructions">Scan with your phone to download directly</p>
        
        <button 
          className="download-qr-button" 
          onClick={downloadQRCode}
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
};

export default LinkDisplay;