import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__nav">
          <div className="footer__section">
            <h3>COMPANY</h3>
            <ul className="footer__links">
              <li><Link to="/about" className="footer__link">About Last.fm</Link></li>
              <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
              <li><Link to="/jobs" className="footer__link">Jobs</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>HELP</h3>
            <ul className="footer__links">
              <li><Link to="/track-music" className="footer__link">Track My Music</Link></li>
              <li><Link to="/community-support" className="footer__link">Community Support</Link></li>
              <li><Link to="/guidelines" className="footer__link">Community Guidelines</Link></li>
              <li><Link to="/help" className="footer__link">Help</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>GOODIES</h3>
            <ul className="footer__links">
              <li><Link to="/download" className="footer__link">Download Scrobbler</Link></li>
              <li><Link to="/api" className="footer__link">Developer API</Link></li>
              <li><Link to="/free-music" className="footer__link">Free Music Downloads</Link></li>
              <li><Link to="/merchandise" className="footer__link">Merchandise</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>ACCOUNT</h3>
            <ul className="footer__links">
              <li><Link to="/inbox" className="footer__link">Inbox</Link></li>
              <li><Link to="/settings" className="footer__link">Settings</Link></li>
              <li><Link to="/pro" className="footer__link">Last.fm Pro</Link></li>
              <li><Link to="/logout" className="footer__link">Logout</Link></li>
            </ul>
          </div>
          <div className="footer__section">
            <h3>FOLLOW US</h3>
            <ul className="footer__links">
              <li><a href="https://facebook.com/lastfm" className="footer__link">Facebook</a></li>
              <li><a href="https://twitter.com/lastfm" className="footer__link">Twitter</a></li>
              <li><a href="https://instagram.com/lastfm" className="footer__link">Instagram</a></li>
              <li><a href="https://youtube.com/lastfm" className="footer__link">YouTube</a></li>
            </ul>
          </div>
        </nav>
        <div className="footer__bottom">
          <div className="footer__language">
            <span>Time zone: Europe/Moscow</span>
          </div>
          <div className="footer__legal">
            <Link to="/terms" className="footer__link">Terms of Use</Link>
            <Link to="/privacy" className="footer__link">Privacy Policy</Link>
            <Link to="/legal" className="footer__link">Legal Policies</Link>
            <Link to="/cookies" className="footer__link">Cookies Policy</Link>
            <Link to="/gdpr" className="footer__link">Do Not Sell My Personal Information</Link>
          </div>
          <div className="footer__copyright">
            <p>CBS Interactive © 2024 Last.fm Ltd. All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}; 