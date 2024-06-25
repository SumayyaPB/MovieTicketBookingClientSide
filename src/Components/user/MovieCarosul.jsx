// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import axios from "axios";
import MovieGrid from "./MovieGrid"; // Ensure this path is correct
import StaticMovie from "./StaticMovie";
import cardImg1 from "../../assets/up2.webp";
import cardImg2 from "../../assets/up3.webp";
import cardImg3 from "../../assets/up5.webp";
import cardImg4 from "../../assets/up6.webp";
// import './MovieCarousel.css'; // Ensure this CSS file exists

const MovieCarousel = () => {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/getuser`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUser(response.data);
      } else {
        window.location.href = "/user/login";
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const getMovies = async () => {
    try {
      const response = await axios.get(
        "https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log(response.data); // Verify the response data
        setMovies(response.data);
      } else {
        console.error("Error fetching movies:", response);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    getMovies();
    getUser();
  }, []);

  useEffect(() => {
    console.log("Movies:", movies); // Verify movies state
    console.log("User:", user); // Verify user state
  }, [movies, user]);

  return (
    <div className="sliderout ">
      {movies && movies.length > 0 && user ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={3}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            "@1.00": {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            "@1.50": {
              slidesPerView: 6,
              spaceBetween: 2,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <MovieGrid movie={movie} user={user} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // <p>Loading...</p>
        <div className="d-flex justify-content-center gap-5">
          <StaticMovie title="Bigil" img={cardImg1} />
          <StaticMovie title="" img={cardImg2} />
          <StaticMovie title="Bigil" img={cardImg3} />
          <StaticMovie title="Bigil" img={cardImg4} />
        </div>
      )}
    </div>
  );
};

export default MovieCarousel;
