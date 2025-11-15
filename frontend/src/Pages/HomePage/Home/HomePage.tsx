import React from 'react';
import { Link } from 'react-router-dom'; 
import './HomePage.css'; 

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Our Application</h1>
      <p className="home-subtitle">
        Please sign in to continue or create an account if you're new.
      </p>

      <div className="home-links-container">
        <Link to="/signin" className="home-link-btn">Sign In</Link>
        <Link to="/signup" className="home-link-btn home-link-signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default HomePage;