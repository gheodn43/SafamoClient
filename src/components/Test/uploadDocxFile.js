import React, { useState } from 'react';

const DocxFileUpload = ({ onDocxUpload }) => {
  const [docxFile, setDocxFile] = useState(null);

  const handleDocxChange = (event) => {
    const file = event.target.files[0];
    setDocxFile(file);
  };

  const uploadDocxFile = async () => {
    if (docxFile) {
      const data = new FormData();
      data.append("file", docxFile);
      data.append("upload_preset", 'kkmfo95u');
      data.append("cloud_name", 'dlsvhqtfp');
      data.append("folder", "Cloudinary-React");
      data.append("resource_type", "raw");

      try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/dlsvhqtfp/raw/upload`, {
          method: "POST",
          body: data,
        });
        const res = await response.json();
        onDocxUpload(res.url);
      } catch (error) {
        console.error("Error uploading DOCX file", error);
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        onChange={handleDocxChange}
        accept=".docx"
      />
      <button onClick={uploadDocxFile} disabled={!docxFile}>
        Tải lên DOCX
      </button>
    </div>
  );
};

export default DocxFileUpload;
