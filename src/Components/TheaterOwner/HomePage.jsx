// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import addIcon from "../../assets/addicon.svg";
import editIcon from "../../assets/editicon.svg";
import deleteIcon from "../../assets/deleteIcon.svg";

const HomePage = () => {
  return (
    <div className="admin-dashboard">
      <h1>Welcome to admin Dashboard</h1>
      <div className="d-flex flex-wrap gap-5 justify-content-center">
        <Link
          className="sidebar-link text-decoration-none text-dark"
          to="/theaterowner/components/movie/createmovie"
        >
          <div className="dashboard-div">
            <div className="icon-container">
              <img src={addIcon} alt="Add Movie Icon" className="icon-image" />
              <span className="icon-text">Add Movie</span>
            </div>
          </div>
        </Link>
        <Link
          className="sidebar-link text-decoration-none text-dark"
          to="/theaterowner/components/theater/addtheater"
        >
          <div className="dashboard-div">
            <div className="icon-container">
              <img
                src={addIcon}
                alt="Add Theater Icon"
                className="icon-image"
              />
              <span className="icon-text">Add Theater</span>
            </div>
          </div>
        </Link>
        <Link
          className="sidebar-link text-decoration-none text-dark"
          to="/theaterowner/components/theater/addmovieschedules"
        >
          <div className="dashboard-div">
            <div className="icon-container">
              <img
                src={addIcon}
                alt="Add Schedule Icon"
                className="icon-image"
              />
              <span className="icon-text">Add Schedule</span>
            </div>
          </div>
        </Link>
        {/* <Link
          className="sidebar-link text-decoration-none text-dark"
          to="/theaterowner/components/theater/updateTheater"
        >
          <div className="dashboard-div">
            <div className="icon-container">
              <img
                src={editIcon}
                alt="Edit Movie Icon"
                className="icon-image"
              />
              <span className="icon-text">Update Theater</span>
            </div>
          </div>
        </Link> */}
        <Link
          className="sidebar-link text-decoration-none text-dark"
          to="/theaterowner/components/theater/deleteTheater"
        >
          <div className="dashboard-div">
            <div className="icon-container">
              <img
                src={deleteIcon}
                alt="Delete Movie Icon"
                className="icon-image"
              />
              <span className="icon-text">Delete Theater</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
