import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import studyBuddyLogo from './img/studybuddy-logo.png';
import profileLogo from './img/profile.png';
import shopLogo from './img/shop.png';
import sellLogo from './img/sell.png';
import friendsLogo from './img/friends.png';
import img1 from './img/image1.jpeg';
import img2 from './img/image2.jpeg';
import img3 from './img/image3.jpeg';
import img4 from './img/image4.jpeg';
import img5 from './img/image5.jpeg';
import img6 from './img/image6.jpeg';
import img7 from './img/image7.jpeg';

function HomePage() {

  return (
    <div>
      <Header />
      <main>
        <h1 class='welcome'><strong>Welcome to UW Study Buddy</strong></h1>
        <h4 class='welcome'>Unlock Your Learning Legacy: Connect, Sell, Succeed!</h4>
        <ul class='banner'>
            <li><img src={img1} alt="campusImage" /></li>
            <li><img src={img2} alt="campusImage" /></li>
            <li><img src={img3} alt="campusImage" /></li>
            <li><img src={img4} alt="campusImage" /></li>
            <li><img src={img5} alt="campusImage" /></li>
            <li><img src={img6} alt="campusImage" /></li>
            <li><img src={img7} alt="campusImage" /></li>
        </ul>

        <div className="home-btns">
          <ul>
            <li>
              <Link to="/profile">
                <img src={profileLogo} alt="Profile Logo" />
                <span>Profile</span>
                <p>Create a profile & get started!</p>
              </Link>
            </li>
            <li>
              <Link to="/availablelistings">
                <img src={shopLogo} alt="Shop Logo" />
                <span>Shop</span>
                <p>Shop from other students!</p>
              </Link>
            </li>
            <li>
              <Link to="/sell">
                <img src={sellLogo} alt="Sell Logo" />
                <span>Sell</span>
                <p>Sell your old materials!</p>
              </Link>
            </li>
            <li>
              <Link to="/friends">
                <img src={friendsLogo} alt="Friends Logo" />
                <span>Friends</span>
                <p>Connect with peers or alumni!</p>
              </Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;