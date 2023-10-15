import React from 'react';
const TagCardIntoRoom = ({ tagname}) => {
    return (
        <div
            className="card hover-effect tag-card-container"
            style={{ height: "2rem", margin: "5px", padding: "0.5rem" }}
        >
            {tagname}
        </div>
    );
};

export default TagCardIntoRoom;
