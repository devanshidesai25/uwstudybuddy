import React, { useState } from 'react';

function SchoolSupplyListingForm() {
  const [supply, setSupply] = useState('');
  const [condition, setCondition] = useState('');
  const [image, setImage] = useState(null); // Handle image upload separately
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      supply,
      condition,
      image, // Handle image upload separately
      description,
      price,
    };

    console.log('Form Data:', formData);
  };

  return (
    <section id="add-listing">
      <h1>Add School Supply Listing</h1>

      <div className="listing-form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="supply">Type of Supply</label>
          <input
            type="text"
            id="supply"
            name="supply"
            value={supply}
            onChange={(e) => setSupply(e.target.value)}
            required
          />

          <label htmlFor="condition">Condition</label>
          <select
            name="condition"
            className="condition-picker"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="brandNew">Brand New</option>
            <option value="veryGood">Very Good</option>
          </select>
          
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          ></textarea>

          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <button type="submit">Submit Listing</button>
        </form>
      </div>
    </section>
  );
}

export default SchoolSupplyListingForm;

