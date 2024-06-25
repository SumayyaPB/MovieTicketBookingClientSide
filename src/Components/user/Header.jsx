// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import "./Header.css";
import userIcon from "../../assets/userIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import movieLogo from '../../assets/MovieLogo (2).png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const navigate = useNavigate(); // Hook for programmatic navigation

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
   
  const handleLogout = async () => {
    try {
      const response = await axios.get("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/logout", {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response.data);
      if (response.status === 200) {
        setIsLoggedIn(false);
        navigate("/user/login");
      }
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
      navigate("/user/signin");
    }
  };

  const checkLoginStatus = async () => {
    try {
      const token = sessionStorage.getItem('token');

      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      const response = await axios.get("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/checklogin", {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Check login response:", response.data);
      setIsLoggedIn(response.data.ok);
    } catch (error) {
      console.error("Login status check error:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <Link to="/"><img src={movieLogo} alt="" className="movieLogo"/>MOVIE</Link>
        </div>
        <div className={`nav-links ${isOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          
            <li className="logout-user">
                  <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
            <li className="login-user">
                <Link to="/user/login">Login</Link>
            </li>
            <li>
                <span className="user-icon">
                  <Link to="/userDashboard">
                      <img src={userIcon} alt="User Dashboard" className="text-light"/>
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
