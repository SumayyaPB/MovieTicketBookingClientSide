

// eslint-disable-next-line no-unused-vars
import React from "react";
import caroselImg from "../../assets/02.webp";
import CarouselImg1 from "../../assets/03.webp";
import CarouselImg2 from "../../assets/01.webp";
import "./HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MovieSlider from "../../Components/user/MovieCard";
import MovieCarousel from "../../Components/user/MovieCarosul";

const HomePage = () => {
  const movies = [
    {
      title: "Kalki",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Kalki_2898_AD.jpg/220px-Kalki_2898_AD.jpg",
      description:
        "Kalki 2898 AD (stylised as Kalki 2898 A.D) is an upcoming 2024 Indian epic dystopian science fiction action film written and directed by Nag Ashwin",
      videoSrc: "https://www.youtube.com/embed/kQDd1AhGIHk?si=3PGmWS86UG_eoVjr",
    },
    {
      title: "Sarfira",
      imgSrc:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sarfira-et00387250-1718776300.jpg",
      description:
        "An incredible story, set in the world of startups and aviation, Sarfira will inspire the common man to dream big and to chase your dreams even if the world calls you crazy.",
      videoSrc: "https://www.youtube.com/embed/8Iy2geJD8HY?si=6Ucq7QAoN9Nqf3F0",
    },
    {
      title: "SRIKANTH",
      imgSrc:
        "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/srikanth-et00354108-1712743850.jpg",
      description:
        "In a world with odds stacked against him in every step of the way, Srikanth defies norms, blazing a trail from rural India to becoming the first visually impaired student at MIT.",
      videoSrc: "https://www.youtube.com/embed/OMeuJP5iBWY?si=Ld7dMOMlELbDImVY",
    },
    {
      title: "Turbo",
      imgSrc:
        "https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/Turbo_Poster.jpg/220px-Turbo_Poster.jpg",
      description:
        "Turbo is an Indian Malayalam action comedy film directed by Vaishakh and written by Mithun Manuel Thomas. It was produced by Mammootty under the banner of Mammootty Company.",
      videoSrc: "https://www.youtube.com/embed/LOE8ESPIMpE?si=qujJeJuzqu8jvL5P",
    },
  ];

  return (
    <div className="App">
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={caroselImg} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={CarouselImg1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={CarouselImg2} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <hr />
      <div className="movie-slider-wrapper mt-5">
        <h2 className="text-center fs-2">UPCOMING MOVIES</h2>
        <MovieSlider movies={movies} />
      </div>
      <hr />
      
      <div className="movie-grid-wrapper mt-5">
        <h2 className="text-center fs-2">ALL MOVIES</h2>
        <MovieCarousel/>
      </div>
    </div>
  );
};

export default HomePage;

