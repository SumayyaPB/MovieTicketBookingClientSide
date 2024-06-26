// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "./BuyTicket.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const BuyTicketsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { _id } = params;

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [movie, setMovie] = useState(null);
  const [theatres, setTheatres] = useState(null);

  const getMovie = async () => {
    try {
      if (_id) {
        const response = await axios.get(
          `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies/${_id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setMovie(response.data);
          console.log("Movie data:", response.data);
        } else {
          console.error("Error fetching movie data:", response.data);
        }
      } else {
        console.error("Movie ID is undefined");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const getTheatres = async () => {
    try {
      const response = await axios.get(
        `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/theater/theatersByUser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setTheatres(response.data);
        console.log("Theatre data:", response.data);
      } else {
        console.error("Error fetching theatres:", response.data);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    console.log("Params:", params);
    if (_id) {
      getMovie();
    } else {
      console.error("Movie ID is missing");
    }
  }, [_id]);

  useEffect(() => {
    getTheatres();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    console.log("Selected date:", event.target.value);
  };

  return (
    <>
      {movie && (
        <div className="buytickets">
          <div className="s1 d-flex flex-column justify-content-center align-items-center">
            <div className="head">
              <h1 className="text-center">{movie.title}</h1>
              <img src={movie.movieImg} alt="" />
            </div>
            <input 
              type="date" 
              value={selectedDate} 
              onChange={handleDateChange} 
            />
          </div>  
          {theatres && theatres.length > 0 && (
            <div className="screens">
              {theatres.map((theater, index) => (
                <div className="screen" key={index}>
                  <div>
                    <h2>{theater.theaterName}</h2>
                    <h3>{theater.location}</h3>
                  </div>
                  <button
                    className="theme_btn1 linkstylenone"
                    onClick={() =>
                      navigate(`/theater/${theater._id}/${selectedDate}/${_id}`)
                    }
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default BuyTicketsPage;
