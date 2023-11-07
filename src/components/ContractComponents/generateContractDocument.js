import React, { useState } from 'react';
import axios from 'axios';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { saveAs } from 'file-saver';

import DocxFileUpload from '../Test/uploadDocxFile';
import ContractService from '../../services/contractService';
import A4 from '../../assets/images/A4.png';

const GenerateContractDocument = ({
  uploadedFile,
  docxFileUrl,
  property_name,
  property_address,
  room_id,
  room_name,
  maximum_quantity,
  room_price,
  acreage,
  duarationTime,
  contract_creation_date,
  contract_end_date,
  partyA_id,
  partyA_fullname,
  partyA_birthdate,
  partyA_phone_number,
  partyA_cccd,
  partyA_address,
  partyB_id,
  partyB_fullname,
  partyB_birthdate,
  partyB_phone_number,
  partyB_cccd,
  partyB_address,
}) => {
  const [isGenerated, setIsGenerated] = useState(false);
  const [contractId, setContractId] = useState('');
  const [contractLink, setContractLinl] = useState(null);
  const generateDocument = async () => {
    const handleFileContent = (content) => {
      var zip = new PizZip(content);
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({
        property_name: property_name,
        property_address: property_address,
        duarationTime: duarationTime,
        room_name: room_name,
        maximum_quantity: maximum_quantity,
        room_price: room_price,
        acreage: acreage,
        contract_creation_date: contract_creation_date,
        contract_end_date: contract_end_date,
        partyA_fullname: partyA_fullname,
        partyA_birthdate: partyA_birthdate,
        partyA_phone_number: partyA_phone_number,
        partyA_cccd: partyA_cccd,
        partyA_address: partyA_address,
        partyB_fullname: partyB_fullname,
        partyB_birthdate: partyB_birthdate,
        partyB_phone_number: partyB_phone_number,
        partyB_cccd: partyB_cccd,
        partyB_address: partyB_address,
      });

      try {
        doc.render();
      } catch (error) {
        console.error('Lỗi khi điền dữ liệu vào tài liệu:', error);
      }

      var out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(out, `contract_${property_name}.docx`);
    };

    if (uploadedFile) {
      // Nếu có tệp đã tải lên từ máy khách
      const fileReader = new FileReader();
      fileReader.onload = function (event) {
        const content = event.target.result;
        handleFileContent(content);
      };
      fileReader.readAsArrayBuffer(uploadedFile);
      setIsGenerated(true);
    } else if (docxFileUrl) {
      // Nếu có liên kết tải tệp trực tuyến
      try {
        const response = await axios.get(docxFileUrl, { responseType: 'arraybuffer' });
        const content = response.data;
        handleFileContent(content);
        setIsGenerated(true);
      } catch (error) {
        console.error('Lỗi khi tải tệp DOCX trực tuyến:', error);
      }
    } else {
      alert('Vui lòng tải lên một tệp hoặc cung cấp liên kết tới tệp DOCX trước khi tạo tài liệu.');
    }
  };

  const handleDocxUpload = async (docxUrl) => {
    const rentRoomInfo = {
      contractCreationDate: contract_creation_date,
      contractEndDate: contract_end_date,
      durationTime: duarationTime,
      room_id: room_id,
      partyA_id: partyA_id,
      partyB_id: partyB_id,
      contractLink: docxUrl,
    };
    const response = ContractService.generateContract(rentRoomInfo);
    if (response) {
      setContractId(response);
      setContractLinl(docxUrl);
    }

  };

  return (
    <div className='container'>
      <div className='row'>
        <button className="btn btn-primary btn-lg btn-block" onClick={generateDocument}>
          Tạo cam kết thuê
        </button>
      </div>
      {isGenerated && (
        <div className='container'>
          <DocxFileUpload onDocxUpload={handleDocxUpload} />
        </div>
      )}
      {contractLink ? (
        <div>
          <div className='row d-flex justify-content-center'>
            <a
              href={contractLink}
              target="_blank"
              style={{ textAlign: 'center' }}
            >
              <img src={A4} alt='cam ket thue nha' />
              <p>Bản cam kết thuê phòng</p>
            </a>
          </div>
          <div className='row'>
            
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default GenerateContractDocument;
