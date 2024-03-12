import React, { useEffect, useState} from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';

function ListingDetails() {
  const [listingData, setListingData] = useState(null);
  const { id } = useParams();

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

  const contactOwner = () => {
    const ownerEmail = listingData ? listingData.email : '';
    window.location.href = `mailto:${ownerEmail}`;
  };

  return (
    <div className="listing-info">
      {listingData ? (
        <>
          <p>{listingData.name}</p>
          <p>{listingData.condition}</p>
          <p>{listingData.price}</p>
          <p>{listingData.description}</p>
          <button className="contact-owner-button" onClick={contactOwner}>
            Contact Owner
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ListingDetails;