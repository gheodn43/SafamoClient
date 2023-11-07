import React, { useState, useEffect } from 'react';
import ProgressBar from '../../ProcessComponents/processComponent';
import picture from "../../../assets/images/property_create_cussesful.png"

const RoomCreateSuccess = () => {


    return (
        <div>
            <ProgressBar initialValue={90} targetValue={100} />
            <div
                className='container'>
                <img
                    src={picture}
                    style={{ width: "50%", margin: "25% 25%"}}
                />
            </div>
        </div>
    );
};

export default RoomCreateSuccess;
