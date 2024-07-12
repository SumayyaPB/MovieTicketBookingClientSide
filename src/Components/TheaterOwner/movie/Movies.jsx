import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import deleteIcon from "../../../assets/deleteIcon.svg";
import { BsFillStarFill } from "react-icons/bs";
import './Movies.css'

const Movies = () => {
  const { setValue, watch } = useForm();
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    try {
      const res = await axios.get(
        "https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies"
      );
      setMovies(res.data);
      console.log("Movies fetched:", res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const deleteMovie = async (movieId) => {
    try {
      await axios.delete(
        `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/deletemovie/${movieId}`
      );
      // Remove the deleted movie from the state
      setMovies(movies.filter((movie) => movie._id !== movieId));
      console.log(`Movie with ID: ${movieId} deleted successfully`);
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="movie-items">
      <h1>Movies</h1>
      <div className="d-flex flex-wrap gap-3">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div
              className={
                watch("movieId") === movie._id ? "item selected" : "item"
              }
              key={index}
              onClick={() => setValue("movieId", movie._id)}
            >
              <img src={movie.movieImg} alt="" />
              <p>{movie.title}</p>
              <p className="rating">
                <BsFillStarFill className="star" />
                &nbsp;&nbsp;
                {movie.rating}/10
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteMovie(movie._id);
                }}
                className="dlt-btn"
              >
                delete <img src={deleteIcon} className="dlticon"/>
              </button>
              {/* <img src={deleteIcon} alt="" onClick={(e) => {
                e.stopPropagation();
                deleteMovie(movie._id);
              }}/> */}
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </div>
  );
};

export default Movies;
