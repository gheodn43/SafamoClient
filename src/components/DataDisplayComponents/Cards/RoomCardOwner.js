import React from 'react';
import { Link , useLocation} from 'react-router-dom';
import draftRentalPicture from '../../../assets/images/draftRentalPicture.png'
import TagCardIntoRoom from './TagCardIntoRoom';
const RoomCardOwner = ({ imageUrls, roomName, roomStatus, tags, roomPrice, roomId}) => {
    const location = useLocation();
    const isPropertyDetailPage = location.pathname.includes('/rental_manage/property_detail/');

    const detailLink = isPropertyDetailPage
        ? `/rental_manage/room-edit/${roomId}`
        : `/rooms-for-rent/${roomId}`;

    return (
        <div className="card hover-effect " style={{ width: "18rem" }}>
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" style={{ height: "200px" }}>
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                            <img
                                className="d-block w-100 h-100"
                                src={imageUrls.length > 0 ? imageUrl : draftRentalPicture}
                                alt={`Slide 1`}
                            />
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
            <div className={`card-body ${roomStatus === 'Đang được thuê' ? 'row-green-background' : (roomStatus === 'Đang khởi tạo hợp đồng' ? 'row-yellow-background' : '')}`}>
                <h5 className="card-title">{roomName}</h5>
                <p className="card-text">{roomStatus}</p>
                <div className='row'>
                    {
                        tags.map((tag, index) => (
                            <TagCardIntoRoom
                                key={index}
                                tagname={tag}
                            />
                        ))
                    }
                </div>
                <p className="card-text">Giá thuê/ Tháng: {roomPrice + ' VNĐ'}</p>
                <Link to={detailLink} className="btn btn-primary">
                    <i className="fa fa-eye"></i>
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
};

export default RoomCardOwner;
