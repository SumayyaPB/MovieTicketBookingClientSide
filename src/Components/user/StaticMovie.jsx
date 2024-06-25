// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import "./StaticMovie.css";

const StaticMovie = ({ title, img }) => {
  return (
    <div className="staticmovie">
      <div className="card" style={{ width: "15rem", height: "21rem" }}>
        <img src={img} className="card-img-top" alt="..." />

        <Link to="/user/login" className="book-your-seat btn">
          Book Your Seat
        </Link>
      </div>
    </div>
  );
};

export default StaticMovie;
