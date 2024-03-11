import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import AvailableListings from './Shop';
import Sell from './Sell';
import Profile from './Profile';
import ListingDisplay from './ListingDisplay';
import Friends from './Friends';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Shop from './Shop'


function App(props) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/shop" element={<Shop/>} />
    </Routes>
  );
}

export default App;
