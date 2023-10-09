import React, { useState } from 'react';
import PropertyBasicInfoForm from './PropertyBasicInfoForm';
import PropertyAddressConfirmation from './PropertyAddressConfirmation';
import PropertyImageUpload from './PropertyImageUpload';
import PropertyPreview from './PropertyPreview'
import propertyService from '../../../services/propertyService'
const PropertyCreation = () => {
    const [step, setStep] = useState(1);

    const [propertyInfo, setPropertyInfo] = useState({
        propertyName: "",
        address: "",
        unitForRent: "",
        propertyRole: "",

    });
    const [gpsAddress, setGpsAddress] = useState({
        lat: '',
        lng: '',
    });
    const [pictureUrl, setPictureUrl] = useState("");

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
        } else if (step === 4) {
            setStep(3);
        }
    };
    const handleConfirmAddress = (confirmedGpsAddress) => {
        setGpsAddress(confirmedGpsAddress);
        setPropertyInfo({
            ...propertyInfo,
            gpsAddress: confirmedGpsAddress,
        });
        setStep(3);
    };

    const handleComplete = async (uploadedPictureUrl) => {
        setPictureUrl(uploadedPictureUrl);
        setPropertyInfo({
            ...propertyInfo,
            pictureUrl: uploadedPictureUrl
        });
        setStep(4);
        // try {
        //     const createdProperty = await propertyService.create(newProperty);
        //     console.log("Property created:", createdProperty);
        // } catch (error) {
        //     console.error("Lỗi khi tạo tài sản:", error);
        // }
    };

    const handleConfirmAll = () => {
        try {
            propertyService.create(propertyInfo);
            console.log("Property created:", propertyInfo);
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
                    gpsAddress={gpsAddress}
                    onConfirmAddress={handleConfirmAddress}
                    propertyInfo={propertyInfo}
                />
            )}

            {step === 3 && (
                <PropertyImageUpload
                pictureUrl={pictureUrl}
                onImageUpload={handleComplete}
                />
            )}

            {step === 4 && (
                <PropertyPreview
                propertyInfo={propertyInfo}
                onCreateNewProperty={handleConfirmAll}
                />
            )}

            {step > 1 && (
                <button className='btn btn-secondary' onClick={handlePreviousStep}>Quay lại</button>
            )}
        </div>
    );
};


export default PropertyCreation;
