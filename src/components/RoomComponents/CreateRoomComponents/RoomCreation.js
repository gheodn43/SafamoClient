import React, { useState } from 'react';
import RoomBasicInfoForm from './RoomBasicInfoForm'
import RoomTagsInfoForm from './RoomTagsInfoForm'
import RoomPreviewInfo from './RoomPreviewInfo'
import RoomCreateSuccess from './RoomCreateSuccess'
const RoomCreation = ({propertyId}) => {
    const [step, setStep] = useState(1);
    const [roomInfo, setRoomInfo] = useState({
        roomName: "",
        description: "",
        acreage: "",
        price: "",
        maxQuantity: "",

    });
    const [tagsRoom, SetTagsRoom] = useState([]);
    const handleNextStep = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };
    const handlePreviousStep = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        } else if (step === 4) {
            setStep(3);
        }
    };


    const handleAddTags = (confirmTagsRoom) => {
        SetTagsRoom(confirmTagsRoom);
        setRoomInfo({
            ...roomInfo,
            tagIds: confirmTagsRoom,
        });
    };

    return (
        <div className='container'>
            {step === 1 && (
                <RoomBasicInfoForm
                    roomInfo={roomInfo}
                    setRoomInfo={setRoomInfo}
                    onNextStep={handleNextStep}
                />
            )}

            {step === 2 && (
                <RoomTagsInfoForm
                    tagsRoom={tagsRoom}
                    onConfirmTags={handleAddTags}
                    onNextStep={handleNextStep}
                />
            )}
            {step === 3 && (
                <RoomPreviewInfo
                    roomInfo={roomInfo}
                    propertyId={propertyId}
                    onNextStep={handleNextStep}
                />
            )}
            {step === 4 && (
                <RoomCreateSuccess
                    
                />
            )}
            {(step > 1 && step <4) && (
                <button className='btn btn-secondary' onClick={handlePreviousStep}>Quay lại</button>
            )}
        </div>
    );
};


export default RoomCreation;
