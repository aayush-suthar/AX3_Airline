import React, { useContext } from 'react';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return ( 
    <div className="navbar">  
      <div className="navbar-container"> 
        <Link to="/" className="navbar-logo">Ax3 Airlines</Link>
        <ul className="navbar-nav">
          <li className="navbar-item"><Link to="/" state={{user}}>Home</Link></li>
          <li className="navbar-item"><Link to="/flights" state={{user}}>Flights</Link></li>
          {user ? (
            <>
              <li className="navbar-item user-profile active"><Link to="/profile" state={{user}}>Profile</Link></li>
              <li className="navbar-item"><button onClick={logout} className="logout-button">Logout</button></li>
            </>
          ) : (
            <>
              <li className="navbar-item"><Link to="/login">Login</Link></li>
              <li className="navbar-item"><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
