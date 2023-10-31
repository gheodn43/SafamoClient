
import React from "react";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Về chúng tôi</h3>
            <p>
              This is the website about motel rooms with the best market in Ngu
              Hanh Son district, Da Nang city
            </p>
          </div>

          <div className="footer-section">
            <h3>LIÊN HỆ</h3>
            <p>Email: safamofall2023@gmail.com</p>
            <p>Sđt: 0775420232</p>
            
            <span>
              <i className="fa fa-facebook"></i>
            </span>
            
            <span className="logo-footer">
              <i className="fa fa-instagram"></i>
            </span>

            <span className="logo-footer">
              <i className="fa fa-envelope"></i>
            </span>

            <span className="logo-footer">
              <i className="fa fa-twitter"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 Safamo.com | Hiện đại - nhanh chóng - An toàn
      </div>
    </footer>
  );
};

export default Footer;