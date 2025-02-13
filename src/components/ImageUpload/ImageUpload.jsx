import { useState } from 'react';
import './ImageUpload.css';

const ImageUpload = ({ onImageChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    await handleFile(file);
  };

  const handleFileInput = async (e) => {
    const file = e.target.files[0];
    await handleFile(file);
  };

  const handleFile = async (file) => {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_CLOUDINARY_UPLOAD_PRESET');

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();
      onImageChange({ url: data.secure_url, file });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div
        className={`upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input').click()}
      >
        <div className="upload-icon">⬆️</div>
        <p className="upload-text">
          {uploading ? 'Uploading...' : 'Drag & drop or click to upload your photo'}
        </p>
        <input
          type="file"
          id="file-input"
          accept="image/*"
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default ImageUpload;
