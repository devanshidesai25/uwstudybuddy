import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Header from './Header';
import Footer from './Footer';
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
      <main id='main'>
        <h1 className='welcome'><strong>Welcome to UW Study Buddy</strong></h1>
        <h4 className='welcome'>Unlock Your Learning Legacy: Connect, Sell, Succeed!</h4>

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
                <span>Create Profile</span>
                <p>Start building connections!</p>
              </Link>
            </li>
            <li>
              <Link to="/shop">
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
                <span>Find Friends</span>
                <p>Connect with peers!</p>
              </Link>
            </li>
          </ul>
        </div>
      <div className='social-icons'>
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://www.instagram.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
          </div>
          </main>
      <Footer />
    </div>
  );
}

export default HomePage;
