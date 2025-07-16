// frontend/src/components/Navbar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="/dashboard">TaskMaster Pro</a>
        <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;