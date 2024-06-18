// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./Header.css";
import userIcon from "../assets/userIcon.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    sessionStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <a href="#">Logo</a>
        </div>
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <ul>
            <li>
            <Link to='/'>Home</Link>
            </li>
            <li>
            <Link to='/booking'>Booking</Link>
            </li>
            <li>
             <Link to='/contact'>Contact</Link>
            </li>

            {isLoggedIn ? (
              <li className="login-user" onClick={handleLogout}>
                <Link>Logout</Link>
              </li>
            ) : (
              <li className="login-user">
                <Link to="/user/login">Login</Link>
              </li>
            )}
            <li>
              <span className="user-icon">
                <Link to="/userDashboard">
                  <img src={userIcon} alt="" />
                </Link>
              </span>
            </li>
          </ul>
        </div>
        <div className="burger-menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
