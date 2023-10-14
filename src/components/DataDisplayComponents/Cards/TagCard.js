import React from 'react';

const TagCard = ({ tagname, isTagSelected, onClick }) => {
    const tagClasses = isTagSelected ? 'tag-card selected card hover-effect' : 'tag-card card';
    return (
        <div
            className={tagClasses}
            style={{ height: "3rem", margin: "5px", padding: "0.5rem" }}
            onClick={onClick}
        >
            <h6 className="card-title">{tagname}</h6>
        </div>
    );
};

export default TagCard;
