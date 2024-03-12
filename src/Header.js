import React from 'react';
import { Link } from 'react-router-dom'; 
import studyBuddyLogo from './img/studybuddy-logo.png';

function Header() {
  return (
    <div className="menu-bar"> 
      <ul>
        <li><Link to="/"><img src={studyBuddyLogo} alt="Study Buddy Logo" className="logo" /></Link></li>
        <li><Link to="/profile">Profile</Link></li> 
        <li><Link to="/friends">Friends</Link></li> 
        <li><Link to="/shop">Shop</Link></li> 
        <li><Link to="/sell">Sell</Link></li> 
        <li><Link to= "/favorites">Favorites</Link></li>
        <li><Link to= "/events">Events</Link></li>
      </ul>
    </div>
  );
}

export default Header;