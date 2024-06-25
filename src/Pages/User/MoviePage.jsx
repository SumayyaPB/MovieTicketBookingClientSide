"use client";

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { BsShare, BsFillStarFill } from "react-icons/bs";
import "./MoviePage.css";
// import MovieCard from '../../Components/user/MovieCard2';
import MovieCarousel from "../../Components/user/MovieCarosul";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import CelebCard from "../../Components/user/CelebCard";

const MoviePage = () => {
  const { _id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const response = await axios.get(
        `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies/${_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(_id);
      console.log(response);
      if (response.status === 200) {
        console.log(response.data);
        setMovie(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, [_id]);

  return (
    <>
      {movie && (
        <div className="moviepage">
          <div
            className="c11"
            style={{
              backgroundImage: `url('https://www.webstrot.com/html/moviepro/html/images/header/02.jpg')`,
            }}
          >
            <div className="left">
              <div className="movie_poster">
                <p>In cinemas</p>
              </div>
              <div className="movie_details">
                <div className="details_container">
                  <div className="image_container">
                    <img
                      src={movie.movieImg}
                      alt={`${movie.title} poster`}
                      className="img"
                    />
                  </div>
                  <div className="details">
                    <p className="title">{movie.title}</p>
                    <p className="rating detailmv">
                      <BsFillStarFill className="star" />
                      &nbsp;&nbsp;
                      {movie.rating}/10
                    </p>
                    <p className="duration_type_releasedat">
                      <span className="duration">{movie.duration}</span>
                      <span>•</span>
                      <span className="type">
                        {Array.isArray(movie.genre)
                          ? movie.genre.join(", ")
                          : movie.genre}
                      </span>
                    </p>
                    <Link
                      to={`/movies/${_id}/buytickets`}
                      className="linkstylenone"
                    >
                      <button className="bookbtn">Book Tickets</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <button className="sharebtn">
                <BsShare className="shareicon" />
                share
              </button>
            </div>
          </div>
          <div className="c2">
            <h1>About the Movie</h1>
            <p>{movie.description}</p>
            {movie.cast.length > 0 && (
              <div className="circlecardslider">
                <div className="line"></div>
                <h1>Cast</h1>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    "@0.00": { slidesPerView: 1, spaceBetween: 2 },
                    "@0.75": { slidesPerView: 2, spaceBetween: 2 },
                    "@1.00": { slidesPerView: 3, spaceBetween: 2 },
                    "@1.50": { slidesPerView: 6, spaceBetween: 2 },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {movie.cast.map((cast, index) => (
                    <SwiperSlide key={index}>
                      <CelebCard {...cast} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            {movie.crew.length > 0 && (
              <div className="circlecardslider">
                <div className="line"></div>
                <h1>Crew</h1>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={1}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    "@0.00": { slidesPerView: 1, spaceBetween: 2 },
                    "@0.75": { slidesPerView: 2, spaceBetween: 2 },
                    "@1.00": { slidesPerView: 3, spaceBetween: 2 },
                    "@1.50": { slidesPerView: 6, spaceBetween: 2 },
                  }}
                  modules={[Pagination]}
                  className="mySwiper"
                >
                  {movie.crew.map((crew, index) => (
                    <SwiperSlide key={index}>
                      <CelebCard {...crew} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
            <div className="line"></div>
            <h1>You might also like</h1>
            {/* Assuming MovieCarousel is another component you've defined */}
            <MovieCarousel />
          </div>
        </div>
      )}
    </>
  );
};

export default MoviePage;
