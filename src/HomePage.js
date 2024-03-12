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
import img1 from './img/image1.jpg';
import img2 from './img/image2.jpg';
import img3 from './img/image3.jpg';
import img4 from './img/image4.jpg';
import img5 from './img/image5.jpg';
import img6 from './img/image6.jpg';
import img7 from './img/image7.jpg';

function HomePage() {

  return (
    <div>
      <Header />
      <main id='main'>
        <h1 className='welcome'><strong>Welcome to UW Study Buddy</strong></h1>
        <h4 className='welcome'>Unlock Your Learning Legacy: Connect, Sell, Succeed!</h4>

        <ul class='banner'>
            <li><img src={img1} alt="man-in-grad-gown" /><cite><a href="https://unsplash.com/photos/man-wearing-academic-gown-2RouMSg9Rnw">Source for Image 1</a></cite></li>
            <li><img src={img2} alt="college-campus-building" /><cite><a href="https://unsplash.com/photos/brown-concrete-building-1iuxWsIZ6ko">Source for Image 2</a></cite></li>
            <li><img src={img3} alt="students-in-library" /><cite><a href="https://unsplash.com/photos/group-of-people-inside-the-library-CyvK_Z2pYXg">Source for Image 3</a></cite></li>
            <li><img src={img4} alt="college-event" /><cite><a href="https://unsplash.com/photos/laughing-people-in-party-fIHozNWfcvs">Source for Image 4</a></cite></li>
            <li><img src={img5} alt="college-lab" /><cite><a href="https://www.istockphoto.com/photo/technical-college-students-exchanging-ideas-gm1455935808-491120522?utm_source=pixabay&utm_medium=affiliate&utm_campaign=SRP_image_sponsored&utm_content=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fcollege%2520lab%2F&utm_term=college+lab">Source for Image 5</a></cite></li>
            <li><img src={img6} alt="school-supplies" /><cite><a href="https://unsplash.com/photos/flat-lay-photography-of-blue-backpack-beside-book-and-silver-macbook-02z1I7gv4ao">Source for Image 6</a></cite></li>
            <li><img src={img7} alt="college-campus" /><cite><a href="https://unsplash.com/photos/black-bicycle-parked-in-front-of-building-cXUOQWdRV4I">Source for Image 7</a></cite></li>
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

