// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState, useCallback} from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./UserSidebar.css"

// const UserSidebar = () => {
//   const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();


// const checkUserAuthentication = async () => {
//   try {
//     const token = sessionStorage.getItem("token");
//     const response = await axios.get(
//       "http://localhost:3000/api/v1/admin/checkLogin",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       }
//     );
//     if (response.status === 200) {
//       setIsUserAuthenticated(true);
//     } else {
//       setIsUserAuthenticated(false);
//     }
//   } catch (error) {
//     console.error(
//       "An error occurred during admin authentication check",
//       error
//     );
//     setIsUserAuthenticated(false);
//   }
// }

// useEffect(() => {
//   checkUserAuthentication();
// }, []);


//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     setIsUserAuthenticated(false);
//     setUser(null);
//     navigate("/"); // Redirect to home or login page after logout
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="col-sm-3">
//       {!isSidebarOpen && (
//         <button className="sidebar-toggle shead" onClick={toggleSidebar}>
//           Dashboard
//         </button>
//       )}
//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <div className="sidebar-header">
//           <Link
//             className="sidebar-brand text-decoration-none text-dark"
//             to="/userDashboard/profile"
//           >
//             My Cinemas
//           </Link>
//           {isSidebarOpen && (
//             <span className="close-sidebar" onClick={toggleSidebar}>
//               X
//             </span>
//           )}
//         </div>
//         <div className="sidebar-content">
//           <ul className="sidebar-nav">
//             {isUserAuthenticated ? user (
//               <>
//                 <div className="user-details">
//                   <h1>
//                     {user.firstName} {user.lastName}
//                   </h1> 
//                    <p>{user.email}</p>
//                 </div>
//                 <li className="sidebar-item list-unstyled">
//                   <Link
//                     // className="sidebar-link text-decoration-none text-dark"
//                     to="/userDashboard/profile"
//                   >
//                     Profile
//                   </Link>
//                 </li>
//                 <li className="sidebar-item list-unstyled">
//                   <Link
//                     className="sidebar-link text-decoration-none text-dark"
//                     to="/user/bookings"
//                   >
//                     Bookings
//                   </Link>
//                 </li>
//                 <li className="sidebar-item list-unstyled">
//                   <button
//                     className="sidebar-link text-decoration-none text-dark"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="sidebar-item list-unstyled">
//                   <Link to="/userDashboard/profile">Profile</Link>
//                 </li>
//                 <li className="sidebar-item list-unstyled">
//                   <button
//                     className="sidebar-link text-decoration-none text-dark"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//       {isSidebarOpen && (
//         <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
//       )}
//     </div>
//   );
// };

// export default UserSidebar;
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserSidebar.css";


const UserSidebar = () => {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `https://movie-ticket-bookingapplication-1.onrender.com/user/getuser`,
        {
          headers: {
            Authorization: `Bearer ${token}`,

          },
        }
      );
      setUser(response.data);
    } catch (error) {
      console.error("An error occurred while fetching user data", error);
    }
  }, []);

  const checkUserAuthentication = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setIsUserAuthenticated(false);
        return;
      }

      const response = await axios.get(
        "https://movie-ticket-bookingapplication-1.onrender.com/checklogin",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setIsUserAuthenticated(true);
        fetchUserData(); // Fetch user data if authenticated
      } else {
        setIsUserAuthenticated(false);
        console.error("Authentication failed:", response.data);
      }
    } catch (error) {
      console.error(
        "An error occurred during admin authentication check",
        error
      );
      setIsUserAuthenticated(false);
    }
  }, [fetchUserData]);

  useEffect(() => {
    checkUserAuthentication();
  }, [checkUserAuthentication]);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsUserAuthenticated(false);
    setUser(null);
    navigate("/"); // Redirect to home or login page after logout
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="col-sm-3">
      {!isSidebarOpen && (
        <button className="sidebar-toggle shead" onClick={toggleSidebar}>
          Dashboard
        </button>
      )}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link
            className="sidebar-brand text-decoration-none text-dark"
            to="/userDashboard/dashboard"
          >
            My Cinemas
          </Link>
          {isSidebarOpen && (
            <span className="close-sidebar" onClick={toggleSidebar}>
              X
            </span>
          )}
        </div>
        <div className="sidebar-content">
  <ul className="sidebar-nav">
    {isUserAuthenticated && user ? (
      <>
    <div className="user-details">
      <h3>
        {user.firstName ? user.firstName + " " + user.lastName : "Loading..."}
      </h3>
      <p>{user.email ? user.email : "Loading..."}</p>
    </div>

        <li className="sidebar-item list-unstyled">
          <Link
            className="sidebar-link text-decoration-none text-dark"
            to="/userDashboard/profile"
          >
            Profile
          </Link>
        </li>
        <li className="sidebar-item list-unstyled">
          <Link
            className="sidebar-link text-decoration-none text-dark"
            to="/user/bookings"
          >
            Bookings
          </Link>
        </li>
        <li className="sidebar-item list-unstyled">
          <button
            className="sidebar-link text-decoration-none text-dark"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      </>
    ) : (
      <>
        <li className="sidebar-item list-unstyled">
          <Link
            className="sidebar-link text-decoration-none text-dark"
            to="/user/login"
          >
            Login
          </Link>
        </li>
        <li className="sidebar-item list-unstyled">
          <Link
            className="sidebar-link text-decoration-none text-dark"
            to="/user/signup"
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

export default UserSidebar;
