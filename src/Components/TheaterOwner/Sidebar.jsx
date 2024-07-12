// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // Assume you have appropriate styles in Sidebar.css

const Sidebar = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  // const checkLoginStatus = async () => {
  //   try {
  //     const response = await axios.get("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/checklogin", {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       withCredentials: true,
  //     });
  
  //     console.log("Check login response:", response.data);
  //     setIsLoggedIn(response.data.ok);
  //   } catch (error) {
  //     console.error("Login status check error:", error);
  //     setIsLoggedIn(false);
  //   }
  // };

  const checkAdminAuthentication = async () => {
    try {
      // const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "https://movie-ticket-bookingapplication-1.onrender.com/api/v1/admin/checkLogin",
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsAdminAuthenticated(true);
      } else {
        setIsAdminAuthenticated(false);
      }
    } catch (error) {
      console.error(
        "An error occurred during admin authentication check",
        error
      );
      setIsAdminAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAdminAuthentication();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="col-sm-3">
      <button className="sidebar-toggle " onClick={toggleSidebar}>
        ☰
      </button>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link
            className="sidebar-brand text-decoration-none text-dark"
            to="/theaterowner"
          >
            My Cinemas
          </Link>
        </div>
        <div className="sidebar-content">
          <ul className="sidebar-nav">
            {isAdminAuthenticated ? (
              <>
                <li className="sidebar-item list-unstyled">
                  <Link
                    className="sidebar-link text-decoration-none text-dark"
                    to="/theaterowner/components/movie/createmovie"
                  >
                    Add Movie
                  </Link>
                </li>
                <li className="sidebar-item list-unstyled">
                  <Link
                    className="sidebar-link text-decoration-none text-dark"
                    to="/theaterowner/components/theater/addtheater"
                  >
                    Add Theater
                  </Link>
                </li>
                <li className="sidebar-item list-unstyled">
                  <Link
                    className="sidebar-link text-decoration-none text-dark"
                    to="/theaterowner/components/theater/addmovieschedules"
                  >
                    Add Schedule
                  </Link>
                </li>
                <li className="sidebar-item list-unstyled">
                  <Link
                    className="sidebar-link text-decoration-none text-dark"
                    to="/theaterowner/components/theater/deleteTheater"
                  >
                    Delete Theater
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="sidebar-item list-unstyled">
                  <Link
                    className="sidebar-link text-decoration-none text-dark"
                    to="theaterowner/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="sidebar-item list-unstyled">
                  <Link
                    className="sidebar-link text-decoration-none text-dark"
                    to="/theaterowner/signup"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {isSidebarOpen && (
        <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      )}
    </div>
  );
};

export default Sidebar;
