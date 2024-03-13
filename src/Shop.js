import React, { useState, useEffect } from 'react';
import { getDatabase, ref, get, set } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function ListingCard({ id, name, image, price, isFavorited, onToggleFavorite }) {
  const navigate = useNavigate();

  const handleHeartClick = async () => {
    onToggleFavorite(id);
    const database = getDatabase();
    const supplyRef = ref(database, `supplyListings/${id}/favorited`);
    await set(supplyRef, !isFavorited);
    if (!isFavorited) {
      navigate('/favorites');
    }
  };

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
            View Listing
          </button>
        </Link>
      </div>
      <button className={`heart-button ${isFavorited ? 'favorited' : ''}`} onClick={handleHeartClick}>
        <FontAwesomeIcon icon={faHeart} />
      </button>
    </div>
  );
}

function Shop() {
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

  const handleDropdownChange = (event) => {
    setType(event.target.value);
  };

  const filterListings = (listings) => {
    return listings.filter((listing) => {
      if (selectedSupplyType !== 'All' && listing.supplyType !== selectedSupplyType) {
        return false;
      }
      return true;
    });
  };

  const chooseFavorites = async (id) => {
    const updatedListings = listings.map(listing => {
      if (listing.id === id) {
        const updatedListing = { ...listing, favorited: !listing.favorited };
        
        updateFavorited(id, updatedListing);
        if (updatedListing.favorited) {
          alert(`Listing "${updatedListing.name}" favorited! View in your favorites`);
        }
        return updatedListing;
      }
      return listing;
    });
    setListings(updatedListings);
  };

  const updateFavorited = (id, supplyListings) => {
    const database = getDatabase();
    const supplyRef = ref(database, `supplyListings/${id}`);
    set(supplyRef, supplyListings);
  };

  const filteredListings = filterListings(listings);

  return (
    <div>
      <Header />
      <section id="All-Listings">
        <section id="Filter">
        <h2 id='listings-title'>View Available Listings</h2>
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
              <ListingCard
                key={listing.id}
                id={listing.id}
                name={listing.name}
                image={listing.image}
                price={listing.price}
                isFavorited={listing.favorited}
                onToggleFavorite={chooseFavorites}
              />
            ))}
          </section>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Shop;