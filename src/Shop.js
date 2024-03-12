import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Shop() {
  const [listings, setListings] = useState([]);
  const [selectedSupplyType, setType] = useState('All');

  const filterListings = (listings) => {
    return listings.filter((listing) => {
      if (selectedSupplyType !== 'All' && listing.supplyType !== selectedSupplyType) {
        return false;
      }
      return true;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const snapshot = await get(ref(database, 'supplyListings'));
      const data = [];

      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot) => {
          data.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
      }
      setListings(data);
    };

    fetchData();
  }, []);

  const handleDropdownChange = (event) => {
    setType(event.target.value);
  };

  const filteredListings = filterListings(listings);

  return (
    <div>
      <Header />
      <section id="All-Listings">
        <h2>View Available Listings</h2>
        <section id="Filter">
          <label htmlFor="category">Filter by Category:</label>
          <select id="category" onChange={handleDropdownChange}>
            <option value="All">All</option>
            <option value="Textbook">Textbooks</option>
            <option value="Notes">Notes</option>
            <option value="Supplies">School Supplies</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </section>
        <div className="listings-container">
          <section className="textbook-listings">
            {filteredListings.map((listing) => (
              <div key={listing.id} className="textbook-item-container">
                <img src={listing.image} alt={`${listing.name}`} />
                <ul>
                  <li><h3>{listing.name}</h3></li>
                  <li><h6>${listing.price}</h6></li>
                </ul>
                <div className="more-details-wrapper">
                  <Link to={`/listing/${listing.id}`}>
                    <button>
                      View Full Listing
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shop;
