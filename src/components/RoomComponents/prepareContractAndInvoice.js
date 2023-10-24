import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BaseLayout from '../layoutComponents/BaseLayout';
import { useDropzone } from 'react-dropzone';
import GenerateContractDocument from '../ContractComponents/generateContractDocument';
import roomService from '../../services/roomService';
import userService from '../../services/userService';
import requestDetailService from '../../services/requestDetailService';

const PrepareContractAndInvoice = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [error, setError] = useState('');
    const room_id = queryParams.get('room_id');
    const user_id = queryParams.get('user_id');
    const requestId = queryParams.get('requestId');

    const [roomInfo, setRoomInfo] = useState(null);
    const [request, setRequest] = useState(null);
    const [partyA, setPartyA] = useState(null);
    const [partyB, setPartyB] = useState(null);

    const [uploadedFile, setUploadedFile] = useState(null);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => {
            setUploadedFile(acceptedFiles[0]);
        },
    });

    const navigate = useNavigate();
    const contractLink ="";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const roomInfo = await roomService.viewDetailRoomIsValid(room_id);
                setRoomInfo(roomInfo);
                const requestInfo = await requestDetailService.getOneRentalReq(requestId);
                setRequest(requestInfo);
                const party_a = await userService.getMYProfile();
                setPartyA(party_a);
                const party_b = await userService.getUserInfo(user_id);
                setPartyB(party_b);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [room_id]);

    const handleGoBack = () => {
        window.history.back();
    };

    

    if (!roomInfo || !request || !partyA || !partyB) {
        return <div>Loading...</div>;
    }
    const handleAccept = (requestId, contractLink) => {
        requestDetailService.acceptRentalReq(requestId, contractLink)
        .then(() => {
            roomService.draftContractForRoom(room_id);
            navigate('/rental_manage/request-receive');
        })
        .catch(error => {
            setError(error.message);
        });
    };
    const duarationTime = request.duarationTime;
    let durationTime;
    if (duarationTime === "3 Tháng") {
        durationTime = 3;
    } else if (duarationTime === "6 Tháng") {
        durationTime = 6;
    } else if (duarationTime === "1 Năm") {
        durationTime = 12;
    } else {
        // Xử lý khi không khớp với các giá trị trên
        durationTime = 0; // Hoặc một giá trị mặc định khác
    }
    const today = new Date();

    // Tính ngày sau thời gian mong muốn
    const futureDate = new Date(today);
    futureDate.setMonth(today.getMonth() + durationTime);

    // Lấy ngày, tháng và năm của ngày hiện tại
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    // Lấy ngày, tháng và năm của ngày sau 6 tháng
    const futureDay = futureDate.getDate();
    const futureMonth = futureDate.getMonth() + 1;
    const futureYear = futureDate.getFullYear();

    // Định dạng thành chuỗi "yyyy-mm-dd"
    const contract_creation_date = `${currentYear}-${currentMonth < 10 ? '0' : ''}${currentMonth}-${currentDay < 10 ? '0' : ''}${currentDay}`;
    const contract_end_date = `${futureYear}-${futureMonth < 10 ? '0' : ''}${futureMonth}-${futureDay < 10 ? '0' : ''}${futureDay}`;

    const property_name = roomInfo.propertyName;
    const property_address = roomInfo.address;

    const room_name = roomInfo.roomName;
    const maximum_quantity = roomInfo.maxQuantity;
    const room_price = roomInfo.price;
    const acreage = roomInfo.acreage;

    const partyA_fullname = partyA.fullname !== null ? partyA.fullname : 'invalid';
    const partyA_birthdate = partyA.birthdate !== null ? partyA.birthdate : 'invalid';
    const partyA_phone_number = partyA.phone_number !== null ? partyA.phone_number : 'invalid';
    const partyA_cccd = partyA.cccd !== null ? partyA.cccd : 'invalid';
    const partyA_address = partyA.address !== null ? partyA.address : 'invalid';


    const partyB_fullname = partyB.fullname !== null ? partyB.fullname : 'invalid';
    const partyB_birthdate = partyB.birthdate !== null ? partyB.birthdate : 'invalid';
    const partyB_phone_number = partyB.phone_number !== null ? partyB.phone_number : 'invalid';
    const partyB_cccd = partyB.cccd !== null ? partyB.cccd : 'invalid';
    const partyB_address = partyB.address !== null ? partyB.address : 'invalid';

    console.log(contract_end_date);
    console.log(durationTime);
    return (
        <BaseLayout>
            <div className='container'>
                <p>Room ID: {room_id}</p>
                <p>User ID: {user_id}</p>
                <p>Request ID: {requestId}</p>
                <div>
                    <h2>Upload a file</h2>
                    <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                        <p className="centered-text">
                            {uploadedFile ? `File selected: ${uploadedFile.name}` : 'Kéo thả file .docx hoặc click để chọn file'}
                        </p>
                    </div>
                    {uploadedFile &&
                        <GenerateContractDocument
                            uploadedFile={uploadedFile}
                            property_name={property_name}
                            property_address={property_address}

                            room_name={room_name}
                            maximum_quantity={maximum_quantity}
                            room_price={room_price}
                            acreage={acreage}

                            duarationTime={duarationTime}
                            contract_creation_date={contract_creation_date}
                            contract_end_date={contract_end_date}

                            partyA_fullname={partyA_fullname}
                            partyA_birthdate={partyA_birthdate}
                            partyA_phone_number={partyA_phone_number}
                            partyA_cccd={partyA_cccd}
                            partyA_address={partyA_address}

                            partyB_fullname={partyB_fullname}
                            partyB_birthdate={partyB_birthdate}
                            partyB_phone_number={partyB_phone_number}
                            partyB_cccd={partyB_cccd}
                            partyB_address={partyB_address}

                        />}
                    <div className='row'>
                    <div className='col'>
                        <button className='btn btn-secondary' onClick={handleGoBack}>Quay lại</button>
                    </div>
                    <div className='col text-right'>
                        <button className='btn btn-success' onClick={() => handleAccept(requestId, contractLink)}>Xác nhận và gửi</button>
                    </div>
                </div>
                </div>
            </div>
        </BaseLayout>
    );
};

export default PrepareContractAndInvoice;
