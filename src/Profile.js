import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import profiles from './profileData';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    major: '',
    grade: '',
    email: '',
    bio: ''
  });

  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedProfiles, setSelectedProfiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('profileData', JSON.stringify(formData));
      alert('Profile saved successfully!');
      setFormData({
        name: '',
        image: null,
        major: '',
        grade: '',
        email: '',
        bio: ''
      });

      const filtered = profiles.filter(profile =>
        profile.major === formData.major || profile.grade === formData.grade
      );
      setFilteredProfiles(filtered);
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again later.');
    }
  };

  const handleProfileClick = (profile) => {
    if (isProfileSelected(profile)) {
      setSelectedProfiles(prevSelected => prevSelected.filter(p => p.id !== profile.id));
    } else {
      setSelectedProfiles(prevSelected => [...prevSelected, profile]);
    }
  };

  const isProfileSelected = (profile) => {
    return selectedProfiles.includes(profile);
  };

  const handleSendEmail = () => {
    if (selectedProfiles.length === 0) {
      alert('Please select at least one profile to send an email.');
      return;
    }
    
    const emailList = selectedProfiles.map(profile => profile.email).join(';');
    const subject = 'Your Subject';
    const body = 'Your email body content.';
    const mailtoLink = `mailto:${emailList}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
  };
  

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2 id='submit-title'>Submit Your Profile</h2>
        <p id='desc'>Once you submit, scroll down to view recommended profiles based on your year & major!</p>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} />
          </div>
          <div>
            <label>Major:</label>
            <input type="text" name="major" value={formData.major} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name={`email-${formData.id}`} value={formData[`email-${formData.id}`]} onChange={handleChange} required />
          </div>
          <div>
            <label>Grade:</label>
            <select name="grade" value={formData.grade} onChange={handleChange}>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>
          </div>
          <div>
            <label>Bio:</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
          </div>
          <button type="submit">Find Friends!</button>
          <p id='desc2'>After submitting, click on which profiles you'd like to contact. Email one at a time, or select multiple profile cards and click the email button on any of them to send a group email!</p>
        </form>
      </div>
      <div>
        {filteredProfiles.length > 0 && (
          <div className='allCards'>
            {filteredProfiles.map(profile => (
              <div
                key={profile.id}
                className={`card ${isProfileSelected(profile) ? 'selected' : ''}`}
                onClick={() => handleProfileClick(profile)}
              >
                <div className="card-body">
                  <h5 className="card-title">{profile.name}</h5>
                  <p className="card-text">Major: {profile.major}</p>
                  <p className="card-text">Email: {profile.email}</p>
                  <p className="card-text">Grade: {profile.grade}</p>
                  <p className="card-text">Bio: {profile.bio}</p>
                  <button onClick={handleSendEmail}>Send an Email!</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProfileForm;
