import React, {useState} from 'react';
import DocxFileUpload from './Test/uploadDocxFile';
const Test = () => {
  const handleDocxUpload = (docxUrl) => {
    console.log("DOCX uploaded:", docxUrl);
  };
  return (
      <div className="container">
        <DocxFileUpload onDocxUpload={handleDocxUpload} />
      </div>
  );
};

export default Test;


