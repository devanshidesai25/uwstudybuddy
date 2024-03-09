import React from 'react';
import {Link} from 'react-router-dom';
import studyBuddyLogo from './img/studybuddy-logo.png';


function Header() {
  return (
    <div class="menu-bar">
        <ul>
            <li><img src={studyBuddyLogo} alt="Study Buddy Logo" /></li>
            <li><a id="title" href="/">UW Study Buddy -</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="Profile">Friends</a></li>
            <li><a href="AvailableListings">Shop</a></li>
            <li><a href="Sell">Sell</a></li>
            <li><a href="Friends">Alumni</a></li>
        </ul>
    </div>
  );
}

export default Header;