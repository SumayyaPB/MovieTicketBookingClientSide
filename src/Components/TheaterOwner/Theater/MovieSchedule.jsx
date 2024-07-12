

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./MovieSchedule.css";
import { ToastContainer, toast } from "react-toastify";

const Page = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [city, setCity] = useState("");
  const [theaters, setTheaters] = useState([]);
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

  const getScreensByCity = async () => {
    if (city === "") return toast.error("Please select a city");
    try {
      const res = await axios.get(`https://movie-ticket-bookingapplication-1.onrender.com/api/v1/theater/theaterbycity/${city.toLowerCase()}`);
      console.log("Response from getScreensByCity:", res.data);
      setTheaters(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching screens:", error);
    }
  };

  const createSchedule = async (data) => {
    if (!data.theaterId || !data.movieId || !data.showTime || !data.showDate) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const res = await axios.post("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/theater/movieschedules", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Schedule creation response:", res.data);
      if (res.data.message) {
        toast.success("Schedule created successfully");
      } else {
        toast.error("Schedule creation failed");
      }
    } catch (error) {
      console.error("Error creating schedule:", error);
      toast.error("Schedule creation failed");
    }
  };

  return (
    <div className="col-sm-9 formpage d-flex justify-content-center align-items-center flex-column mt-5">
      <ToastContainer />
      <div className="citysearch">
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="movieschedule-input"
        />
        <button onClick={getScreensByCity} className="movischedule-search">
          Search
        </button>
      </div>

      <form onSubmit={handleSubmit(createSchedule)} className="movieschedule-form">
        <div className="items">
          <div className="d-flex flex-column justify-content-center ">
            <h1>Theaters</h1>
            {theaters.length > 0 ? (
              theaters.map((theater, index) => (
                <div
                  className={watch("theaterId") === theater._id ? "item selected" : "item"}
                  key={index}
                  onClick={() => setValue("theaterId", theater._id)}
                >
                  <p>{theater.theaterName}</p>
                  {/* If theater.seats is an object or array, handle it properly */}
                  <p>{Array.isArray(theater.seats) ? theater.seats.length : JSON.stringify(theater.seats)}</p>
                  <p>{theater.city}</p>
                  <p>{theater.screenType}</p>
                </div>
              ))
            ) : (
              <p>No Theaters available</p>
            )}
          </div>
        </div>

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

        <div className="d-flex flex-column justify-content-center movieSchedule-inputbox">
          <input
            type="time"
            name="showTime"
            id="showTime"
            {...register("showTime")}
            className="movieschedule-input"
          />
          <input
            type="date"
            name="showDate"
            id="showDate"
            {...register("showDate")}
            className="movieschedule-input"
          />
          <button type="submit" className="movischedule-submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
