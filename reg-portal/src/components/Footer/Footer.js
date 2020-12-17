import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import ADGLogo from "../../assets/img/adglogo.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-socials">
        <FontAwesomeIcon icon={faFacebook} size="lg" />
        <FontAwesomeIcon icon={faInstagram} size="lg" />
        <FontAwesomeIcon icon={faLinkedin} size="lg" />
      </div>
      <div className="footer-logo">
        <img src={ADGLogo} alt="ADG Log" />
      </div>
      <div className="footer-contact">
        <div className="contact-us">Contact US</div>
        <div className="contact-mail">
          <a href="mailto:adgvit@vit.ac.in">adgvit@vit.ac.in</a>
        </div>
      </div>
    </div>
  );
}
