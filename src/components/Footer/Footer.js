import React from 'react';
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="copyright">
                © Academlo 2022
            </div>
            <div className="social-networks">
                <a href="https://www.instagram.com/academlohq/">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/academlo/">
                    <i class="fa-brands fa-linkedin-in"></i>
                </a>
                <a href="https://www.youtube.com/c/academlo">
                    <i class="fa-brands fa-youtube"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;