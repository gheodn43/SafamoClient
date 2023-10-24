import React from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import PizZipUtils from 'pizzip/utils/index.js';
import { saveAs } from 'file-saver';

function loadFile(file, callback) {
  // Tải nội dung từ tệp đã tải lên
  const reader = new FileReader();
  reader.onload = function (event) {
    const content = event.target.result;
    callback(null, content);
  };
  reader.onerror = function (error) {
    callback(error, null);
  };
  reader.readAsArrayBuffer(file);
}

const GenerateContractDocument = ({ uploadedFile, property_name, property_address,
  room_name, maximum_quantity, room_price, acreage,
  duarationTime, contract_creation_date, contract_end_date, 
  partyA_fullname, partyA_birthdate, partyA_phone_number, partyA_cccd, partyA_address,
  partyB_fullname, partyB_birthdate, partyB_phone_number, partyB_cccd, partyB_address }) => {
  const generateDocument = () => {
    if (!uploadedFile) {
      alert('Vui lòng tải lên một tệp trước khi tạo tài liệu.');
      return;
    }

    loadFile(uploadedFile, function (error, content) {
      if (error) {
        throw error;
      }

      var zip = new PizZip(content);
      var doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({
        property_name: property_name,
        property_address: property_address,
        duarationTime:duarationTime,

        room_name: room_name,
        maximum_quantity: maximum_quantity,
        room_price:room_price,
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
      }

      var out = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      });
      saveAs(out, `contract_${property_name}.docx`);
    });
  };

  return (
    <div className="p-2 text-right">
      <button className='btn btn-primary' onClick={generateDocument}>Tạo hợp đồng </button>
    </div>
  );
};

export default GenerateContractDocument;
