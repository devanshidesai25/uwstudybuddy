import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { Link } from 'react-router-dom'; 
import Header from './Header';
import Footer from './Footer'; 
import algebrabook from './img/algebrabook.jpg';
import biobook from './img/biobook.png';
import pythonbook from './img/pythonbook.png';

const AvailableListings = () =>{

  const[listings, setListings] = useState([]);
  const [listingType, setType] = useState("All"); 
  
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

  const filterListings = (listings) => {
    return listings.filter((listing) => {
      if (listingType !== "All" && listingType !== listing.type) return false;
      return true;
    });
  };

const filteredListings = filterListings(listings);

return (
    <div>
      <Header />
      <section id="All-Listings">
        <h2>Available Listings</h2>
        <section id="Filter">
          <label htmlFor="category">Filter by Category:</label>
          <select id="category" onChange={(e) => { setType(e.target.value); console.log(e.target.value); }}>
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
                <img src={listing.image} alt={`${listing.name} Image`} />
                <ul>
                  <li><h4>{listing.condition}</h4></li>
                  <li><h4>{listing.price}</h4></li>
                  <li><h4>{listing.name}</h4></li>
                  <li><h4>{listing.name}</h4></li>
                  <li><h4>{listing.name}</h4></li>
                </ul>
              </div>
            ))}
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AvailableListings;