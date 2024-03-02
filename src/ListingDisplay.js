import React from 'react';
import Header from './Header'; 
import Footer from './Footer'; 
import pythonbook from './img/pythonbook.png';


function ListingDisplay() {
  return (
    <div>
      <Header />
      <div className="listing-info">
        <h1>Listing Information</h1>
        <h3>Python Textbook</h3>
        <div>
          <img src={pythonbook} alt="Picture of Python Textbook" />
        </div>
        <div>
          <h2>Price:</h2>
          <p>$20.00</p>
        </div>
        <div>
          <h2>Condition</h2>
          <p>Very Good</p>
        </div>
        <div>
          <h2>Description</h2>
          <p>Some wear and tear, but no writing or marks within the book.</p>
        </div>
      </div> 
      <Footer />
    </div>
  );
}

export default ListingDisplay;