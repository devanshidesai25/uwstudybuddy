import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import profiles from './profileData';

function FriendItem({ friend }) {
  return (
    <div className="card m-3" style={{ width: '18rem' }}>
      <div className="card-body">
        <h5 className="card-title">{friend.name}</h5>
        <p className="card-text">Major: {friend.major}</p>
        <p className="card-text">Grade: {friend.grade}</p>
        <p className="card-text">Bio: {friend.bio}</p>
        <a href="#" className="btn btn-primary purple-btn">
          View Profile
        </a>
      </div>
    </div>
  );
}

function Friends() {
  const [searchCriteria, setSearchCriteria] = useState({
    major: '',
    grade: ''
  });
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(profiles);
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

    const filteredProfiles = profiles.filter((profile) => {
      const majorMatch =
        !searchCriteria.major ||
        profile.major.toLowerCase().includes(searchCriteria.major.toLowerCase());
      const gradeMatch =
        !searchCriteria.grade || profile.grade.toLowerCase() === searchCriteria.grade.toLowerCase();

      return majorMatch && gradeMatch;
    });

    setSearchResults(filteredProfiles);
  };

  return (
    <div>
      <Header />

      <div className="friends-container">
        <section id="Find Friends">
          <h1>Find Friends</h1>

          <form onSubmit={handleSubmit} className="friends-form">
            <label htmlFor="major">Major:</label>
            <input
              type="text"
              id="major"
              name="major"
              onChange={handleInputChange}
              value={searchCriteria.major}
            />

            <label htmlFor="grade">Grade:</label>
            <select
              name="grade"
              id="grade"
              onChange={handleInputChange}
              value={searchCriteria.grade}
            >
              <option value="">Select grade</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>

            <button type="submit">Search</button>
          </form>
        </section>
      </div>

      <div id="results" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchResults.length === 0 ? (
          <p>
            {searchCriteria.major || searchCriteria.grade
              ? 'No matching friends found.'
              : 'Enter search criteria.'}
          </p>
        ) : (
          searchResults.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))
        )}
      </div>

      {!searchCriteria.major && !searchCriteria.grade && (
        <div id="allFriends" style={{ display: 'flex', flexWrap: 'wrap' }}>
          {profiles.map((friend) => (
            <FriendItem key={friend.id} friend={friend} />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Friends;