import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Assuming you have a separate CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logoContainer">
        <img src='/tce-logo.png' alt="Logo" className="logo" />
        <span className="logoText">Ladies Hostel Database</span>
      </div>
      <div className="nav-buttons"> {/* Use a div instead of ul */}
        <button className="nav-button">
          <Link to="/root" className="nav-link">Home</Link> {/* Link styled as a button */}
        </button>
        <button className="nav-button">
          <Link to="/add-student" className="nav-link">Add Student</Link> {/* Link styled as a button */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
