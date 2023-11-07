import React, { useState } from 'react';


const DocxFileUpload = ({ onDocxUpload }) => {
  const [docxFile, setDocxFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDocxChange = (event) => {
    const file = event.target.files[0];
    setDocxFile(file);
  };

  const uploadDocxFile = async () => {
    if (docxFile) {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    }
  };

  return (
      <div className='row d-flex justify-content-between'>
        <input
          type="file"
          className='col-7 form-control'
          onChange={handleDocxChange}
          accept=".docx"
        />
        <button
          onClick={uploadDocxFile}
          disabled={!docxFile || loading}
          className={`col-4 btn ${loading ? 'btn-secondary' : 'btn-primary'}`}
        >
          {loading ? 'Đang tải lên...' : 'Tải lên DOCX'}
        </button>
      </div>
  );
};

export default DocxFileUpload;
