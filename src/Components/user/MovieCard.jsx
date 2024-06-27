// // src/MovieCard.jsx

// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';

// const MovieCard = ({ title, imgSrc, description, videoSrc} ) => {
//   const [showVideo, setShowVideo] = useState(false);

//   const handleButtonClick = () => {
//     setShowVideo(!showVideo);
//   };

//   return (
//     <div className="card col-sm-12 col-md-5 col-lg-3" style={{ width: '18rem'}}>
//       <img src={imgSrc} className="card-img-top" alt={`${title} Poster` } style={{ height: '22rem'}}/>
//       <div className="card-body text-center">
//         <h5 className="card-title">{title}</h5>
//         <p className="card-text">{description}</p>
//         <button onClick={handleButtonClick} className="btn">
//           View Trailer
//         </button>
//         {showVideo && (
//           <div style={{ marginTop: '15px' }}>
//             <iframe
//               width="560"
//               height="315"
//               src={videoSrc}
//               title={`${title} Trailer`}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//               referrerPolicy="strict-origin-when-cross-origin"
//               allowFullScreen
//             ></iframe>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MovieCard;

// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./MovieCard.css"; // Custom styles for popup
const MovieCard = ({ title, imgSrc, description, onButtonClick }) => {
  return (
    <div className="movie-card p-2">
      <div className="card-overlay">
        <img
          src={imgSrc}
          className="card-img-top img"
          alt={`${title} Poster`}
        />
        <div className="overlay-content">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <button onClick={onButtonClick} className="btn">
            View Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

const MovieSlider = ({ movies }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("");

  const handleButtonClick = (videoUrl) => {
    setVideoSrc(videoUrl);
    setShowVideo(true);
  };

  const closePopup = () => {
    setShowVideo(false);
    setVideoSrc("");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          loop: true,
          autoplay: true, // Enables autoplay
          autoplaySpeed: 2000, // Speed of autoplay in milliseconds (3000ms = 3s)
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {movies.map((movie, index) => (
          <div key={index} className="card-wrapper">
            <MovieCard
              title={movie.title}
              imgSrc={movie.imgSrc}
              description={movie.description}
              onButtonClick={() => handleButtonClick(movie.videoSrc)}
            />
          </div>
        ))}
      </Slider>
      {showVideo && (
        <div className="video-popup">
          <div className="video-popup-content">
            <span className="close-popup" onClick={closePopup}>
              &times;
            </span>
            <iframe
              width="560"
              height="315"
              src={videoSrc}
              title="Video Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSlider;
