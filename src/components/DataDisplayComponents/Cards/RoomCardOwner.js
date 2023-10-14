import React from 'react';

const RoomCardOwner = ({ imageUrls, roomName, roomStatus, tags, roomPrice }) => {
    return (
        <div className="card" style={{ width: "18rem" }}>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img className="d-block w-100" src={imageUrl} alt={`Slide ${index + 1}`} />
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="card-body">
                <h5 className="card-title">{roomName}</h5>
                <p className="card-text">{roomStatus}</p>
                <ul>
                    {tags.map((tag, index) => (
                        <li key={index}>{tag}</li>
                    ))}
                </ul>
                <p className="card-text">Price: {roomPrice}</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    );
};

export default RoomCardOwner;
