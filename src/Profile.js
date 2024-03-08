import React, { useState } from 'react';
import Header from './Header'; 
import Footer from './Footer';
import axios from 'axios'; // You'll need axios to make HTTP requests

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    major: '',
    year: 'Freshman',
    email: '',
    instagram: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('profileData', JSON.stringify(formData));
      alert('Profile saved successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        major: '',
        year: '',
        email: '',
        instagram: '',
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
      <h1>Create Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div>
          <label>Major:</label>
          <input type="text" name="major" value={formData.major} onChange={handleChange} required />
        </div>
        <div>
          <label>Year:</label>
          <select name="year" value={formData.year} onChange={handleChange}>
            <option value="Freshman">Freshman</option>
            <option value="Sophomore">Sophomore</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Instagram:</label>
          <input type="text" name="instagram" value={formData.instagram} onChange={handleChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Save Profile</button>
      </form>
      <Footer />
    </div>
  );
};

export default ProfileForm;
