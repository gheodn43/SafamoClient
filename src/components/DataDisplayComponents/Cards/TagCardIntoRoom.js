import React from 'react';
const TagCardIntoRoom = ({ tagname, onClick}) => {
    return (
        <div
            className="card hover-effect tag-card-container"
            style={{ height: "2rem", margin: "5px", padding: "0.5rem" }}
            onClick={onClick}
        >
            {tagname}
        </div>
    );
};

export default TagCardIntoRoom;
