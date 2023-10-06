import React, { useState } from 'react';
import PropertyBasicInfoForm from './PropertyBasicInfoForm';
import PropertyAddressConfirmation from './PropertyAddressConfirmation';
import PropertyImageUpload from './PropertyImageUpload';
import propertyService from '../../../services/propertyService';

const PropertyCreation = () => {
    const [step, setStep] = useState(1);

    const [propertyInfo, setPropertyInfo] = useState({
        propertyName: "",
        address: "",
        unitForRent: "",
        propertyRole: "",
    });
    const [gpsAddress, setGpsAddress] = useState(null);
    const [pictureUrl, setPictureUrl] = useState(null);

    const handleNextStep = () => {
        if (step === 1) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        }
    };
    const handlePreviousStep = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        }
    };
    const handleConfirmAddress = (confirmedGpsAddress) => {
        setGpsAddress(confirmedGpsAddress);
        setStep(3);
    };

    const handleComplete = async (uploadedPictureUrl) => {
        setPictureUrl(uploadedPictureUrl);
        const newProperty = {
            ...propertyInfo,
            gpsAddress,
            pictureUrl,
        };

        try {
            const createdProperty = await propertyService.create(newProperty);
            console.log("Property created:", createdProperty);
        } catch (error) {
            console.error("Lỗi khi tạo tài sản:", error);
        }
    };

    return (
        <div className='container'>
            {step === 1 && (
                <PropertyBasicInfoForm
                    propertyInfo={propertyInfo}
                    setPropertyInfo={setPropertyInfo}
                    onNextStep={handleNextStep}
                />
            )}

            {step === 2 && (
                <PropertyAddressConfirmation
                    address={propertyInfo.address}
                    onConfirmAddress={handleConfirmAddress}
                />
            )}

            {step === 3 && (
                <PropertyImageUpload
                    onComplete={handleComplete}
                />
            )}

            {step > 1 && (
                <button onClick={handlePreviousStep}>Quay lại</button>
            )}
        </div>
    );
};


export default PropertyCreation;
