import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import studyBuddyLogo from './img/studybuddy-logo.png';

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="menu-bar"> 
      <div className="logo-container">
        <Link to="/"><img src={studyBuddyLogo} alt="Study Buddy Logo" className="logo" /></Link>
      </div>
      <div id="hamburger-menu" onClick={toggleMenu}>
        <a href="#"><i className="fa fa-bars" aria-label="menu"></i></a>
      </div>
      <ul className={showMenu ? "show" : ""}>
        <li><Link to="/profile">Profile</Link></li> 
        <li><Link to="/friends">Friends</Link></li> 
        <li><Link to="/shop">Shop</Link></li> 
        <li><Link to="/sell">Sell</Link></li> 
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/events">Events</Link></li>
      </ul>
    </div>
  );
}

export default Header;



/*import React from 'react';
import { Link } from 'react-router-dom'; 
import studyBuddyLogo from './img/studybuddy-logo.png';

function Header() {
  return (
    <div className="menu-bar"> 
      <div className="logo-container">
          <Link to="/"><img src={studyBuddyLogo} alt="Study Buddy Logo" className="logo" /></Link>
      </div>
      <ul>
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

export default Header; */