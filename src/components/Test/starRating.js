import React from 'react';

const StarRating = ({ value }) => {
    const roundedValue = roundedUserRating(value);
    const stars = [];
    let fullStars = Math.floor(roundedValue);
    let hasHalfStar = roundedValue - fullStars > 0;

    for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fa fa-star" style={{ color: "#ffea00" }}></i>);
    }

    if (hasHalfStar) {
        stars.push(<i key="half" className="fa fa-star-half-o" style={{ color: "#ffea00" }}></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={`empty-${i}`} className="fa fa-star-o" style={{ color: "#ffea00" }}></i>);
    }

    return <div>
        <span>{stars}</span>
        <span>({value})</span>
    </div>;
};

const roundedUserRating = (value) => {
    if (value >= 4.8) return 5;
    if (value >= 4.3) return 4.5;
    if (value >= 3.8) return 4;
    if (value >= 3.3) return 3.5;
    if (value >= 2.8) return 3;
    if (value >= 2.3) return 2.5;
    if (value >= 1.8) return 2;
    if (value >= 1.3) return 1.5;
    if (value >= 0.8) return 1;
    if (value >= 0.3) return 0.5;
    return 0;
};

export default StarRating;
