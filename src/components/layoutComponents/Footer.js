// Footer.js
import React from "react";
import "../../style.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About us</h3>
            <p>
              This is the website about motel rooms with the best market in Ngu
              Hanh Son district, Da Nang city
            </p>
          </div>

          <div className="footer-section">
            <h3>Contact with us</h3>
            <p>Email: safamofall2023@gmail.com</p>
            <p>Phone: 0775420232</p>
            
            {/* Logo Facebook */}
            <span>
              <i className="fa fa-facebook"></i>
            </span>
            
            {/* Logo Insta */}
            <span class="logo-footer">
              <i className="fa fa-instagram"></i>
            </span>

            {/* Logo Gmail */}
            <span class="logo-footer">
              <i className="fa fa-envelope"></i>
            </span>

            {/* Logo Twitter */}
            <span class="logo-footer">
              <i className="fa fa-twitter"></i>
            </span>
          </div>
          {/* Add more footer sections as needed */}
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2023 Safamo.com | Rent for you and best choose for everyone
      </div>
    </footer>
  );
};

export default Footer;
