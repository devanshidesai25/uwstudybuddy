import React from 'react';
import { Routes, Route} from 'react-router-dom';
import HomePage from './HomePage';
import AvailableListings from './AvailableListings';
import Sell from './Sell';
import Profile from './Profile';
import ListingDisplay from './ListingDisplay';
import Friends from './Friends';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';

function App(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/availablelistings" element={<AvailableListings />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/listings" element={<AvailableListings />} />
        <Route path="/apartments/:id" element={<ListingDisplay />} />
      </Routes>
    </div>
  );
}

export default App;