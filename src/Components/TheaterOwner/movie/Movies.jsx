import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect,useState } from "react";

const DeleteTheater = () => {
  const { setValue, watch } = useForm();
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    try {
      const res = await axios.get("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies");
      setMovies(res.data);
      console.log("Movies fetched:", res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="items">
          <h1>Movies</h1>
          <div className="d-flex flex-wrap gap-3">
            {movies.length > 0 ? (
              movies.map((movie, index) => (
                <div
                  className={watch("movieId") === movie._id ? "item selected" : "item"}
                  key={index}
                  onClick={() => setValue("movieId", movie._id)}
                >
                  <p>{movie.title}</p>
                  <p>{movie.description}</p>
                  <p>{movie.rating}</p>
                  <p>{Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</p>
                  <p>{movie.duration}</p>
                </div>
              ))
            ) : (
              <p>No movies available</p>
            )}
          </div>
        </div>
  )
}

export default DeleteTheater