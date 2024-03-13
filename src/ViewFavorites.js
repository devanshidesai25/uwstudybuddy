import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function FavoritesListingCard({ id, name, image, price}) {

  return (
    <div key={id} className="textbook-item-container">
      <img src={image} alt={`${name}`} />
      <ul>
        <li><h3>{name}</h3></li>
        <li><h6>${price}</h6></li>
      </ul>
      <div className="more-details-wrapper">
        <Link to={`/listing/${id}`}>
          <button>
            View Full Listing
          </button>
        </Link>
      </div>
    </div>
  );
}

function Favorites() {
  const [listings, setListings] = useState([]);
  const [selectedSupplyType, setType] = useState('All');

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
      if (listing.favorited !== true) {
        return false;
      }
      return true;
    });
  };

  const filteredListings = filterListings(listings);

  return (
    <div>
      <Header />
      <section id="favorite-listings">
        <h2 className='favs-title'>Your Favorites!</h2>
        <h6 className='favs-desc'>Contact the seller before your item gets sold!</h6>
        <div className="listings-container">
          <section className="textbook-listings">
            {filteredListings.map((listing) => (
              <FavoritesListingCard
                key={listing.id}
                id={listing.id}
                name={listing.name}
                image={listing.image}
                price={listing.price}
              />
            ))}
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Favorites;
