import React from "react";

export default function StarRate({ userRating }) {
    // Làm tròn giá trị userRating
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

    return (
        <>
            <div className="container row">

                <fieldset className="rating">
                    <input type="radio" id="star5" name="rating" value="5" checked={roundedUserRating(userRating) === 5} />
                    <label htmlFor="star5" className="full" title="Awesome"></label>
                    <input type="radio" id="star4.5" name="rating" value="4.5" checked={roundedUserRating(userRating) === 4.5} />
                    <label htmlFor="star4.5" className="half"></label>
                    <input type="radio" id="star4" name="rating" value="4" checked={roundedUserRating(userRating) === 4} />
                    <label htmlFor="star4" className="full"></label>
                    <input type="radio" id="star3.5" name="rating" value="3.5" checked={roundedUserRating(userRating) === 3.5} />
                    <label htmlFor="star3.5" className="half"></label>
                    <input type="radio" id="star3" name="rating" value="3" checked={roundedUserRating(userRating) === 3} />
                    <label htmlFor="star3" className="full"></label>
                    <input type="radio" id="star2.5" name="rating" value="2.5" checked={roundedUserRating(userRating) === 2.5} />
                    <label htmlFor="star2.5" className="half"></label>
                    <input type="radio" id="star2" name="rating" value="2" checked={roundedUserRating(userRating) === 2} />
                    <label htmlFor="star2" className="full"></label>
                    <input type="radio" id="star1.5" name="rating" value="1.5" checked={roundedUserRating(userRating) === 1.5} />
                    <label htmlFor="star1.5" className="half"></label>
                    <input type="radio" id="star1" name="rating" value="1" checked={roundedUserRating(userRating) === 1} />
                    <label htmlFor="star1" className="full"></label>
                    <input type="radio" id="star0.5" name="rating" value="0.5" checked={roundedUserRating(userRating) === 0.5} />
                    <label htmlFor="star0.5" className="half"></label>
                </fieldset>

                <label htmlFor="result" style={{ display: "flex", alignItems: "center" }}>
                    <span>({userRating} <span className="star-symbol " style={{ color: "#FFC107" }}>&#9733;</span>)</span>
                </label>
            </div>
        </>
    );
}
