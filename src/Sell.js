import React from 'react';
import Header from './Header'; 
import Footer from './Footer';

function NewListing() {
  return (
    <div>
    <Header /> {}
\      <div className="listing-container">
        <section id="add-listing">
          <h1>Add School Supply Listing</h1>
          <div className="listing-form">
            
            <label htmlFor="supply">Type of Supply</label>
            <select name="supply" className="supply-picker">
              <option value=" ">Select a condition</option>
              <option>Textbook</option>
              <option>Notes</option>
              <option>Supplies</option>
              <option>Miscanelleous</option>
            </select>

            <label htmlFor="condition">Condition</label>
            <select name="condition" className="condition-picker">
              <option value=" ">Select a condition</option>
              <option>Brand New</option>
              <option>Very Good</option>
              <option>Good</option>
              <option>Used</option>
            </select>

            <label htmlFor="image">Upload Image:</label>
            <input type="file" id="image" name="image" accept="image/*" />

            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" rows="4"></textarea>

            <label htmlFor="price">Price:</label>
            <input type="text" id="price" name="price" />

            <button type="submit">Submit Listing</button>
          </div>
        </section>
      </div>
      <Footer /> 
    </div>
  );
}

export default NewListing;