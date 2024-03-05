import React from 'react';
import { Link } from 'react-router-dom';
import studyBuddyLogo from './img/studybuddy-logo.png';

function Header() {
  return (
    <div className="menu-bar">
    <img className="header-img" src={studyBuddyLogo} alt="Study Buddy Logo" />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/availablelistings">Shop</Link></li>
        <li><Link to="/sell">Sell</Link></li>
        <li><Link to="/friends">Friends</Link></li>
      </ul>
    </div>
  );
}

export default Header;
