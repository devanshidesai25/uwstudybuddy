import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';

function ListingDetails(props) {
  const [listingData, setListingData] = useState(null);
  const id = props;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const database = getDatabase();
        const snapshot = await get(ref(database, `supplyListings/${id}`));

        if (snapshot.exists()) {
          const data = snapshot.val();
          setListingData(data);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!listingData) {
    return <p>Loading...</p>;
  }

  const contactOwner = () => {
    const ownerEmail = listingData.email;
    window.location.href = `mailto:${ownerEmail}`;
  };

  return (
    <div className="listing-info">
      <p>{listingData.name}</p>
      <p>{listingData.condition}</p>
      <p>{listingData.price}</p>
      <p>{listingData.description}</p>
      <button className="contact-owner-button" onClick={contactOwner}>
        Contact Owner
      </button>
    </div>
  );
}

export default ListingDetails;
