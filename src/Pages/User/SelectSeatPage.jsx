
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./SelectSeat.css";
import { useNavigate } from "react-router-dom";

const SelectSeatPage = () => {
  const params = useParams();
  const { _id, date, theater_id } = params;

  const [screen, setScreen] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [notAvailableSeats, setNotAvailableSeats] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/theater/schedulebymovie/${theater_id}/${date}/${_id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          const data = response.data;
          console.log("Schedule Data:", data);
          setScreen(data.theaters); 
          setNotAvailableSeats(data.movieSchedules[0].notAvailableSeats);
          if (data.movieSchedules.length > 0) {
            setSelectedTime(data.movieSchedules[0]);
            console.log(data.movieSchedules);
          }
        } else {
          console.error("Failed to fetch movie schedule:", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id, date, theater_id]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies/${_id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setMovie(response.data); 
          console.log("Movie Data:", response.data);
        } else {
          console.error("Failed to fetch movie details:", response.data);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovie();
  }, [_id]);

  const selectDeselectSeat = (seat) => {
    const isSelected = selectedSeats.find(
      (s) =>
        s.row === seat.row && s.col === seat.col && s.seat_id === seat.seat_id
    );

    if (isSelected) {
      setSelectedSeats(
        selectedSeats.filter(
          (s) =>
            s.row !== seat.row ||
            s.col !== seat.col ||
            s.seat_id !== seat.seat_id
        )
      );
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const generateSeatLayout = () => {
    if (!screen || !selectedTime || !screen.seats) return null;

    return (
      <div>
        <div className="d-flex justify-content-center flex-column">

        <h2>Theater Details</h2>
        <p> {screen.theaterName}</p>
        <p> {screen.location}</p>
        <p> ScreenType :{screen.screenType}</p>
        </div>
        

        {screen.seats.map((seatType, index) => (
          <div className="seat-type" key={index}>
            <h2>{seatType.type} - Rs. {seatType.price}</h2>
            <div className='seat-rows'>
              {seatType.rows.map((row, rowIndex) => (
                <div className="seat-row" key={rowIndex}>
                  <p className="rowname">{row.rowname}</p>
                  <div className="seat-cols flex-wrap">
                    {row.cols.map((col, colIndex) => (
                      <div className="seat-col" key={colIndex}>
                        {col.seats.map((seat, seatIndex) => (
                          <div key={seatIndex}>
                            {notAvailableSeats.find(
                              (s) =>
                                s.row === row.rowname &&
                                s.seat_id === seat.seat_id &&
                                s.col === colIndex
                            ) ? (
                              <span className='seat-unavailable'>{seatIndex + 1}</span>
                            ) : (
                              <span
                                className={
                                  selectedSeats.find(
                                    (s) =>
                                      s.row === row.rowname &&
                                      s.seat_id === seat.seat_id &&
                                      s.col === colIndex
                                  )
                                    ? 'seat-selected'
                                    : 'seat-available'
                                }
                                onClick={() =>
                                  selectDeselectSeat({
                                    row: row.rowname,
                                    col: colIndex,
                                    seat_id: seat.seat_id,
                                    price: seatType.price,
                                  })
                                }
                              >
                                {seatIndex + 1}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <br />
                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleBooking = async () => {
    try {
      const response = await axios.post(
        `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/order/create-order`,
        {
          amount: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
        }
      );

      const { amount, id: order_id, currency } = response.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: amount,
        currency: currency,
        name: "Movie Ticket Booking",
        description: "Test Transaction",
        image: "/your_logo.png",
        order_id: order_id,
        handler: async (response) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
          await axios.post(
            `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/order/verify-payment`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            }
          );
          navigate('/')
        },
        prefill: {
          name: "Your Name",
          email: "youremail@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        console.error("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error("Error during booking", error);
    }
  };

  return (
    <div className="selectseatpage">
      {movie && (
        <div className="s1">
          <div className="head text-white">
            <h1>{movie.title}</h1>
            {Array.isArray(movie.genre) && <h3>{movie.genre.join(" / ")}</h3>}
          </div>
        </div>
      )}

      {screen && (
        <div className="selectseat">
          {generateSeatLayout()}
          <div className="totalcont">
            <div className="total">
              <h2>Total</h2>
              <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
            </div>
            <button
              className='theme_btn1 linkstylenone'
              onClick={handleBooking}
            >Book Now</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectSeatPage;
