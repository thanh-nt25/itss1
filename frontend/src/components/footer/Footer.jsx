import React from "react";
import "./footer.css";
import {
  AiFillFacebook,
  AiFillTwitterSquare,
  AiFillInstagram,
} from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
        HouRenShuu プラットフォーム
        </p>
        <div className="social-links">
          {/* <a href="">
            <AiFillFacebook />
          </a> */}
          <a href="">
            <AiFillTwitterSquare />
          </a>
          {/* <a href="">
            <AiFillInstagram />
          </a> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
