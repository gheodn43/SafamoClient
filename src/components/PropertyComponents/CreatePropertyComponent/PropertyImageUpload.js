import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import ProgressBar from '../../ProcessComponents/processComponent';

const PropertyImageUpload = ({ pictureUrl, onImageUpload }) => {
  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [preview, setPreview] = useState([]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setImages(files);
    setPreview(imagePreviews);
  };

  const handleResetClick = () => {
    setPreview([]);
    setImages([]);
    setUrls([]);
  };

  const uploadImages = async () => {
    setLoading(true);
    const uploadPromises = images.map(async (image) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", 'kkmfo95u');
      data.append("cloud_name", 'dlsvhqtfp');
      data.append("folder", "Cloudinary-React");

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dlsvhqtfp/image/upload`, {
          method: "POST",
          body: data,
        });
        const res = await response.json();
        return res.url;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setUrls(uploadedUrls);
      setUploadSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNext = () => {
    onImageUpload(urls);
  };

  return (
    <div>
      <ProgressBar initialValue={43} targetValue={68} />
      <h3>Tải ảnh về bất động sản của bạn</h3>
      <div className="container">
        <header className="row">
          <input
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
            multiple  // Allow multiple file selection
          />

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview.map((previewUrl, index) => (
              <img key={index} src={previewUrl} alt={`Preview ${index}`} style={{ height: '200px' }} />
            ))}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            onClick={uploadImages}
            className="btn btn-primary"
            disabled={images.length === 0}
          >
            Upload now
          </button>
          <button onClick={handleResetClick} className="btn btn-warning">
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : uploadSuccess ? (
          <div className="pb-8 pt-4">
            Tải ảnh thành công
            {urls.map((url, index) => (
              <div key={index}>Image {index + 1} URL: {url}</div>
            ))}
          </div>
        ) : null}
        <button className='next-step-btn btn btn-primary' onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default PropertyImageUpload;
