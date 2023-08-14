import React from 'react';
import {Link} from 'react-router-dom';
import {useCurrentUser, useUserDispatch} from '../contexts/UserContext';

const Header: React.FC = () => {
    const currentUser = useCurrentUser();
    const dispatch = useUserDispatch();

    const handleLogout = () => {
        dispatch?.({type: 'LOGOUT'});
    };
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to={currentUser?.isAdmin ? '/admin-dashboard' : '/dashboard'} className="logo">Pet Adoption</Link>
                        <nav className="navbar">
                        {currentUser && (
                            <ul className="navbar-list">
                                <li className="navbar-item">
                                    <Link to={currentUser?.isAdmin? '/admin-dashboard': '/dashboard'} className="navbar-link">Home</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/pets" className="navbar-link">Browse Pets</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/shelters" className="navbar-link">Shelters</Link>
                                </li>
                                {currentUser?.isAdmin && (
                                    <li className="navbar-item">
                                        <Link to="/create-pet" className="navbar-link">Create Pet</Link>
                                    </li>
                                )}
                                <li className="navbar-item">
                                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                                </li>
                            </ul>
                        )}
                        {!currentUser && (
                            <ul className="navbar-list">
                            <li className="navbar-item">
                                <Link to="/signup" className="navbar-link">Register</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/login" className="navbar-link">Login</Link>
                            </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
