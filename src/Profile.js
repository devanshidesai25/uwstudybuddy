import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    major: '',
    grade: '',
    bio: ''
  });

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
        bio: ''
      });
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
      <h1>Create Your Profile</h1>
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
        <button type="submit">Save Profile</button>
      </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileForm;
