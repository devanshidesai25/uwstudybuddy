import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getDatabase, ref, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function Sell() {
  const database = getDatabase();
  const storage = getStorage();
  const navigate = useNavigate();

  const saveSupplyListingToDatabase = async (supplyData) => {
    const imageRef = storageRef(storage, `images/${supplyData.image.name}`);
    const uploadTask = uploadBytes(imageRef, supplyData.image);
    try {
      await uploadTask;
      const imageURL = await getDownloadURL(imageRef);
      const supplyImageURL = { ...supplyData, image: imageURL };
      push(ref(database, 'supplyListings'), supplyImageURL)
        .then(() => {
          console.log('Listing Created!');
        })
        .catch((error) => {
          console.error('Error saving your response', error);
        });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const [formData, setFormData] = useState({
    supplyType: '',
    condition: '',
    description: '',
    price: '',
    email: '',
    image: null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0]
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveSupplyListingToDatabase(formData);
    alert('Supply Listing Submitted!');
    setFormData({
      supplyType: '',
      condition: '',
      description: '',
      price: '',
      email: '',
      image: null,
    });
    navigate('/favorites');
  };

  return (
    <div>
      <Header />
      <div className="listing-container">
        <section id="add-listing">
          <h2 id='submit-title'>Have Something to Sell?</h2>
          <div className="listing-form">
            <form onSubmit={handleSubmit}>
              <label htmlFor="supplyType">Type of Supply</label>
              <select
                name="supplyType"
                className="supply-picker"
                value={formData.supplyType}
                onChange={handleInputChange} required
              >
                <option value="">Select a type</option>
                <option>Textbook</option>
                <option>Notes</option>
                <option>Supplies</option>
                <option>Miscellaneous</option>
              </select>

              <label htmlFor="name">Listing name:</label>
              <textarea
                id="name"
                name="name"
                rows="1"
                value={formData.name}
                onChange={handleInputChange} required
              ></textarea>

              <label htmlFor="condition">Condition</label>
              <select
                name="condition"
                className="condition-picker"
                value={formData.condition}
                onChange={handleInputChange} required
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
                onChange={handleImageChange} required
              />

              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange} required
              ></textarea>

              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange} required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange} required
              />

              <button type="submit">Submit Listing</button>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Sell;