import React, { useState } from 'react';

const PropertyImageUpload = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Xử lý khi người dùng chọn hình ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  // Xử lý khi người dùng tải lên hình ảnh
  const handleUploadImage = () => {
    if (selectedImage) {
      // Sử dụng FormData để tạo một đối tượng dữ liệu cho việc tải lên
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Gọi hàm callback để thông báo về việc tải lên hình ảnh
      onImageUpload(formData);
    }
  };

  return (
    <div>
      <h3>Tải lên hình ảnh</h3>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleUploadImage}>Tải lên</button>
    </div>
  );
};

export default PropertyImageUpload;
