import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import Shop from './Shop';
import Sell from './Sell';
import Profile from './Profile';
import Friends from './Friends';
import ListingDetails from '/.ListingDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/shop" element={<Shop/>} />
      <Route path="/listing:id" element={<ListingDetails/> } />
    </Routes>
  );
}

export default App;
