import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import alumni from './AlumniData';

function FriendItem({ friend }) {
  const handleViewLinkedIn = () => {
    window.open(friend.linkedin, '_blank');
  };
  
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{friend.name}</h5>
        <p className="card-text">Major: {friend.major}</p>
        <p className="card-text">Grad Year: {friend.gradYear}</p>
        <p className="card-text">Company: {friend.company}</p>
        <p className="card-text">Position: {friend.position}</p>
        <p className="card-text">Bio: {friend.bio}</p>
        <button className="btn btn-primary purple-btn" onClick={handleViewLinkedIn}>
          View LinkedIn
        </button>
      </div>
    </div>
  );
}

function Friends() {
  const [searchCriteria, setSearchCriteria] = useState({
    major: '',
    gradYear: '',
    company: '',
    position: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(alumni);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prevCriteria) => ({
      ...prevCriteria,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredProfiles = alumni.filter((profile) => {
      const majorMatch =
        !searchCriteria.major ||
        profile.major.toLowerCase().includes(searchCriteria.major.toLowerCase());
      const gradYearMatch =
        !searchCriteria.gradYear ||
        profile.gradYear.toLowerCase() === searchCriteria.gradYear.toLowerCase();
      const companyMatch =
        !searchCriteria.company ||
        profile.company.toLowerCase().includes(searchCriteria.company.toLowerCase());
      const positionMatch =
        !searchCriteria.position ||
        profile.position.toLowerCase().includes(searchCriteria.position.toLowerCase());

      return majorMatch && gradYearMatch && companyMatch && positionMatch;
    });

    setSearchResults(filteredProfiles);
  };

  return (
    <div>
      <Header />

      <div className="friends-container">
        <section className='alumni-search'>
          <h1 className="friends-header">Connect with Alumni!</h1>

          <form onSubmit={handleSubmit} className="friends-form">
            <label htmlFor="major">Major:</label>
            <input
              type="text"
              id="major"
              name="major"
              onChange={handleInputChange}
              value={searchCriteria.major}
            />

            <label htmlFor="gradYear">Graduation Year:</label>
            <input
              type="text"
              id="gradYear"
              name="gradYear"
              onChange={handleInputChange}
              value={searchCriteria.gradYear}
            />

            <label htmlFor="company">Company:</label>
            <input
              type="text"
              id="company"
              name="company"
              onChange={handleInputChange}
              value={searchCriteria.company}
            />

            <label htmlFor="position">Position:</label>
            <input
              type="text"
              id="position"
              name="position"
              onChange={handleInputChange}
              value={searchCriteria.position}
            />

            <button type="submit">Search</button>
          </form>
        </section>
      </div>

      <div id="results" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchResults.length === 0 ? (
          <p>
            {searchCriteria.major || searchCriteria.gradYear || searchCriteria.company || searchCriteria.position
              ? 'No matching friends found.'
              : 'Enter search criteria.'}
          </p>
        ) : (
          searchResults.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))
        )}
      </div>

      {!searchCriteria.major && !searchCriteria.gradYear && !searchCriteria.company && !searchCriteria.position && (
        <div id="allFriends" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {alumni.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Friends;
