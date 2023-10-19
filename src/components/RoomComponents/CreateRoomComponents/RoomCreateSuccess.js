import React, { useState, useEffect } from 'react';
import ProgressBar from '../../ProcessComponents/processComponent';
import picture from "../../../assets/images/property_create_cussesful.png"

const RoomCreateSuccess = () => {


    return (
        <div>
            <ProgressBar initialValue={90} targetValue={100} />
            <div
                className='container'>
                <image
                    src={picture}
                    style={{ width: "100%" }}
                />
            </div>
        </div>
    );
};

export default RoomCreateSuccess;
