// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import "./MovieGrid.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { _id, title, genre, rating, movieImg } = movie;

  const handleCardClick = () => {
    navigate(`/movies/${_id}`);
  };

  return (
    <div className="movies" >
        <div className="moviegrid" onClick={handleCardClick} >
        <img src={movieImg} alt={`${title} poster`} className="movieimg"/>
      <div>
        <p className="rating">
          <BsFillStarFill className="star" />
          &nbsp;&nbsp;
          {rating}/10
        </p>
      </div>
      <div className="details">
        <p className="title">{title}</p>
        <p className="type">{Array.isArray(genre) ? genre.join(", ") : genre}</p>
      </div>
      </div>
    </div>
  );
};

export default MovieCard;
