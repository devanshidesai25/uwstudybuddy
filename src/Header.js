// Header.js
import React from 'react';
import {Link} from 'react-router-dom';
import studyBuddyLogo from './img/studybuddy-logo.png';


function Header() {
  return (
    <div class="menu-bar">
        <ul>
            <li><img src={studyBuddyLogo} alt="Study Buddy Logo" /></li>
            <li><a href="/">Home</a></li>
            <li><a href="Profile">Profile</a></li>
            <li><a href="AvailableListings">Shop</a></li>
            <li><a href="Sell">Sell</a></li>
            <li><a href="Friends">Friends</a></li>
        </ul>
    </div>
  );
}

export default Header;