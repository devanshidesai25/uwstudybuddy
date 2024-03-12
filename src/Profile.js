import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { getDatabase, ref, push } from 'firebase/database';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProfileForm = () => {
  const database = getDatabase();
  const storage = getStorage();

  const [formData, setFormData] = useState({
    name: '',
    image: null,
    major: '',
    grade: '',
    email: '',
    bio: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: name === 'image' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageRef = storageRef(storage, `images/${formData.image.name}`);
      await uploadBytes(imageRef, formData.image);
      const imageURL = await getDownloadURL(imageRef);

      const newData = { ...formData, image: imageURL };
      push(ref(database, 'profileData'), newData)
        .then(() => {
          alert('Profile saved successfully!');
          setFormData({
            name: '',
            image: null,
            major: '',
            grade: '',
            email: '',
            bio: ''
          });
        })
        .catch((error) => {
          console.error('Error saving profile:', error);
          alert('Error saving profile. Please try again later.');
        });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image. Please try again later.');
    }
  };

  return (
    <div>
      <Header />
      <div className="profile-container">
        <h2 id='submit-title'>Submit Your Profile!</h2>
        <form className="profile-form" onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <label>Image:</label>
            <input type="file" name="image" accept="image/*" onChange={handleChange} required />
          </div>
          <div>
            <label>Major:</label>
            <input type="text" name="major" value={formData.major} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
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
          <button type="submit">Submit!</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProfileForm;

