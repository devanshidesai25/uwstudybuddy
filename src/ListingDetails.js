import React, { useEffect, useState} from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { getStorage, ref as storageRef, getDownloadURL } from 'firebase/storage';


function ListingDetails() {
  const [listingData, setListingData] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const snapshot = await get(ref(database, `supplyListings/${id}`));
      if (snapshot.exists()) {
        const data = snapshot.val();
        setListingData(data);
      } else {
        console.log('No data available');
      }
    };
    fetchData();
  }, [id]);

  const contactSeller = () => {
    const sellerEmail = listingData.email;
    window.location.href = `mailto:${sellerEmail}`;
  };


  return (
    <div className="listing-container">
      {listingData ? (
        <>
          <img src={listingData.image}></img>
          <h3>{listingData.name}</h3>
          <p>Condition: {listingData.condition}</p>
          <p>Price: ${listingData.price}</p>
          <p>Note from seller: {listingData.description}</p>
          <button className="contact-seller-button" onClick={contactSeller}>
            Contact Seller
          </button>
        </>
      ) : (
        <p>Error Retrieving Data!</p>
      )}
    </div>
  );
}

export default ListingDetails;