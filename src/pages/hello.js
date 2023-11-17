import React, { useState } from 'react';
import axios from 'axios';

function ImageUpload() {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleUpload = async () => {
    const uploadPromises = selectedFiles.map(async (file) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('https://api.imgbb.com/1/upload', formData, {
          headers: {
            'content-type': 'multipart/form-data',
          },
          params: {
            key: '055cb9e89409d46aa99efa68098b0aae', 
          },
        });

        return response.data.data.url;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    });

    const uploadedImageUrls = await Promise.all(uploadPromises);
    setImageUrls([...imageUrls, ...uploadedImageUrls.filter((url) => url !== null)]);
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Images</button>
      {imageUrls.map((url, index) => (
        <div key={index}>
          <img src={url} alt={`Uploaded Image ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default ImageUpload;