import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getDatabase, ref, get } from 'firebase/database';

function FriendItem({ friend, handleSendEmail, isSelected, toggleSelection }) {
  const sendEmail = () => {
    handleSendEmail(friend.email);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const options = { month: '2-digit', day: '2-digit', year: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`card m-3 ${isSelected ? 'selected' : ''}`} style={{ width: '18rem' }} onClick={toggleSelection}>
      <div className="card-body">
        <h5 className="card-title">{friend.name}</h5>
        <p className="card-text">Major: {friend.major}</p>
        <p className="card-text">Grade: {friend.grade}</p>
        <p className="card-text">Graduation Date: {formatDate(friend.graduationDate)}</p>
        <p className="card-text">Email: {friend.email}</p>
        <p className="card-text">Bio: {friend.bio}</p>
        <button className="btn btn-primary purple-btn" onClick={sendEmail}>
          Send an Email!
        </button>
      </div>
    </div>
  );
}

function Friends() {
  const [searchCriteria, setSearchCriteria] = useState({
    major: '',
    grade: '',
    email: '',
    bio: ''
  });

  const [searchResults, setSearchResults] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const database = getDatabase();
      const snapshot = await get(ref(database, 'profileData'));

      if (snapshot.exists()) {
        const data = [];
        snapshot.forEach((childSnapshot) => {
          data.push({ id: childSnapshot.key, ...childSnapshot.val() });
        });
        setSearchResults(data);
      } else {
        console.log('No data available');
      }
    };

    fetchData();
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

    const filteredProfiles = searchResults.filter((profile) => {
      const majorMatch =
        !searchCriteria.major || profile.major.toLowerCase().includes(searchCriteria.major.toLowerCase());
      const gradeMatch =
        !searchCriteria.grade || profile.grade.toLowerCase() === searchCriteria.grade.toLowerCase();
      const emailMatch =
        !searchCriteria.email || profile.email.toLowerCase().includes(searchCriteria.email.toLowerCase());
      const bioMatch =
        !searchCriteria.bio || profile.bio.toLowerCase().includes(searchCriteria.bio.toLowerCase());

      return majorMatch && gradeMatch && emailMatch && bioMatch;
    });

    setSearchResults(filteredProfiles);
  };

  const toggleProfileSelection = (profile) => {
    setSelectedProfiles((prevSelected) => {
      if (prevSelected.some((p) => p.id === profile.id)) {
        return prevSelected.filter((p) => p.id !== profile.id);
      } else {
        return [...prevSelected, profile];
      }
    });
  };

  const handleSendEmail = () => {
    if (selectedProfiles.length === 0) {
      alert('Please select at least one profile to send an email.');
      return;
    }

    const emailList = selectedProfiles.map((friend) => friend.email).join(',');
    const subject = 'Your Subject';
    const body = 'Your email body content.';
    const mailtoLink = `mailto:${emailList}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
  };

  return (
    <div>
      <Header />

      <div className="friends-container">
        <section className="alumni-search">
          <h1 className="friends-header">Find Friends!</h1>
          <form onSubmit={handleSubmit} className="friends-form">
            <label htmlFor="major">Major:</label>
            <input type="text" id="major" name="major" onChange={handleInputChange} value={searchCriteria.major} />

            <label htmlFor="grade">Grade:</label>
            <select id="grade" name="grade" onChange={handleInputChange} value={searchCriteria.grade}>
              <option value="">Select Grade</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>

            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" onChange={handleInputChange} value={searchCriteria.email} />

            <button type="submit">Search</button>

          </form>
          <p className="multiple-desc">Select multiple cards to send a group email!</p>
        </section>
      </div>

      <div id="results" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {searchResults.length === 0 ? (
          <p>
            {searchCriteria.major || searchCriteria.grade || searchCriteria.email || searchCriteria.bio
              ? 'No matching friends found.'
              : 'Enter search criteria.'}
          </p>
        ) : (
          searchResults.map((profile) => (
            <FriendItem
              key={profile.id}
              friend={profile}
              handleSendEmail={handleSendEmail}
              isSelected={selectedProfiles.some((p) => p.id === profile.id)}
              toggleSelection={() => toggleProfileSelection(profile)}
            />
          ))
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Friends;
