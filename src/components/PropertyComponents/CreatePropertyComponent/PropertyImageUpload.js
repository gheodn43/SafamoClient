import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
const PropertyImageUpload = ({ pictureUrl, onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadImage = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", 'kkmfo95u');
    data.append("cloud_name", 'dlsvhqtfp');
    data.append("folder", "Cloudinary-React");
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dlsvhqtfp/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      setUrl(res.public_id);
      setImageURL(res.url);
      setUploadSuccess(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleNext = () => {
    onImageUpload(imageURL);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleResetClick = () => {
    setPreview(null);
    setImage(null);
  };

  return (
    <div>
      <div className="container">
        <header className="row">
          <input
            id="hidden-input"
            type="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />

          <div className="flex justify-center items-center mt-5 mx-3 max-w-xs">
            {preview && <img src={preview} alt="preview" style={{ height: '200px' }} />}
          </div>
        </header>
        <div className="flex justify-end pb-8 pt-6 gap-4">
          <button
            onClick={uploadImage}
            className="btn btn-primary"
            disabled={!image}
          >
            Upload now
          </button>
          <button
            onClick={handleResetClick}
            className="btn btn-warning"
          >
            Reset
          </button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
            <span>Processing...</span>
          </div>
        ) : (
          uploadSuccess ? (
            <div className="pb-8 pt-4">
              Tải ảnh thành công
              public id: {url}, url: {imageURL}
            </div>
          ) : (
            url && (
              <div className="pb-8 pt-4">
                <Image
                  cloudName='dlsvhqtfp'
                  publicId={url}
                />
              </div>
            )
          )
        )}
        <button className='next-step-btn btn btn-primary' onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default PropertyImageUpload;
