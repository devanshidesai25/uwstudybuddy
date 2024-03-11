mport Header from './Header'; 
import Footer from './Footer';
import { getDatabase, ref, push } from 'firebase/database';
import React, { useState } from 'react';

const Sell = () => {
  const database = getDatabase();

  const saveSupplyListingToDatabase = (supplyData) => {
    push(ref(database, 'supplyListings'), supplyData)
      .then(() => {
        console.log('Listing data saved successfully');
      })
      .catch((error) => {
        console.error('Error saving listing data:', error);
      });
  };

  const [formData, setFormData] = useState({
    type: '',
    condition: '',
    bathrooms: '',
    image: null,
    start_date: new Date(),
    email: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveSupplyListingToDatabase(formData);
    alert('Apartment Details Submitted!');

  };


  return (
    <div>
      <Header />
      <div className="listing-container">
        <section id="add-listing">
          <h1>Add School Supply Listing</h1>
          <div className="listing-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="supplyType">Type of Supply</label>
              <select
                name="supplyType"
                className="supply-picker"
                value={formData.supplyType}
                onChange={handleInputChange}
              >
                <option value="">Select a type</option>
                <option>Textbook</option>
                <option>Notes</option>
                <option>Supplies</option>
                <option>Miscellaneous</option>
              </select>

              <label htmlFor="condition">Condition</label>
              <select
                name="condition"
                className="condition-picker"
                value={formData.condition}
                onChange={handleInputChange}
              >
                <option value="">Select a condition</option>
                <option>Brand New</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Used</option>
              </select>

              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
              ></textarea>

              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
              />

              <button type="submit">Submit Listing</button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Sell;