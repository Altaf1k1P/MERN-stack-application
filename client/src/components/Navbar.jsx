// filepath: d:\MERN stack application\client\src\components\Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/agents" className="nav-link">Agents</Link>
            <Link to="/upload" className="nav-link">Upload CSV</Link>
            <Link to="/tasks" className="nav-link">Task List</Link>
            <button onClick={handleLogout} className="nav-button">Logout</button>
        </nav>
    );
};

export default Navbar;