// eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';
// import './SelectSeat.css';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axios from 'axios';

// const SelectSeatPage = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const params = useParams();
//     const searchParams = new URLSearchParams(location.search);

//     const { _id, date, theater_id } = params;

//     const [screen, setScreen] = useState(null);
//     const [selectedTime, setSelectedTime] = useState(null);
//     const [movie, setMovie] = useState(null);
//     const [selectedSeats, setSelectedSeats] = useState([]);
//     console.log(_id, date, theater_id )

//     const getSchedules = async () => {
//       try {
//           const response = await axios.get(
//               `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/theater/schedulebymovie/${theater_id}/${date}/${_id}`,
//               { withCredentials: true }
//           );
//           if (response.status === 200) {
//               const data = response.data;
//               if (data && data.movieSchedulesforDate && data.movieSchedulesforDate.length > 0) {
//                   setScreen(response.data);
//                   setSelectedTime(data.movieSchedulesforDate[0]);
//               }
//               console.log(response.data)
//             } else {
//               console.log(response.data);
//             }
//       } catch (error) {
//           console.log(error);
//       }
//   };

//     const getMovie = async () => {
//         try {
//             if (_id) {
//                 const response = await axios.get(`https://movie-ticket-bookingapplication-1.onrender.com/api/v1/movie/getmovies/${_id}`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     withCredentials: true,
//                 });
//                 if (response.status === 200) {
//                     setMovie(response.data);
//                 } else {
//                     console.error(response.data);
//                 }
//             } else {
//                 console.error("Movie ID is undefined");
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         getSchedules();
//         getMovie();
//     }, []);

//     const selectDeselectSeat = (seat) => {
//         const isSelected = selectedSeats.find(
//             (s) => s.row === seat.row && s.col === seat.col && s.seat_id === seat.seat_id
//         );

//         if (isSelected) {
//             setSelectedSeats(
//                 selectedSeats.filter(
//                     (s) => s.row !== seat.row || s.col !== seat.col || s.seat_id !== seat.seat_id
//                 )
//             );
//         } else {
//             setSelectedSeats([...selectedSeats, seat]);
//         }
//     };

//     // const generateSeatLayout = () => {
//     //   if (!screen || !selectedTime || !screen.movieSchedulesforDate) return null; // Ensure screen and selectedTime are defined

//     //   const x = screen.movieSchedulesforDate.findIndex(
//     //       (t) => t.showTime === selectedTime.showTime
//     //   );
//     //   const notAvailableSeats = screen.movieSchedulesforDate[x].seats;}

//       return (
//           <div>
//               {screen.screen.seats.map((seatType, index) => (
//                   <div className="seat-type" key={index}>
//                       <h2>{seatType.type} - Rs. {seatType.price}</h2>
//                       <div className='seat-rows'>
//                           {seatType.rows.map((row, rowIndex) => (
//                               <div className="seat-row" key={rowIndex}>
//                                   <p className="rowname">{row.rowname}</p>
//                                   <div className="seat-cols">
//                                       {row.cols.map((col, colIndex) => (
//                                           <div className="seat-col" key={colIndex}>
//                                               {col.seats.map((seat, seatIndex) => (
//                                                   <div key={seatIndex}>
//                                                       {notAvailableSeats.find(
//                                                           (s) =>
//                                                               s.row === row.rowname &&
//                                                               s.seat_id === seat.seat_id &&
//                                                               s.col === colIndex
//                                                       ) ? (
//                                                           <span className='seat-unavailable'>{seatIndex + 1}</span>
//                                                       ) : (
//                                                           <span
//                                                               className={
//                                                                   selectedSeats.find(
//                                                                       (s) =>
//                                                                           s.row === row.rowname &&
//                                                                           s.seat_id === seat.seat_id &&
//                                                                           s.col === colIndex
//                                                                   )
//                                                                       ? 'seat-selected'
//                                                                       : 'seat-available'
//                                                               }
//                                                               onClick={() =>
//                                                                   selectDeselectSeat({
//                                                                       row: row.rowname,
//                                                                       col: colIndex,
//                                                                       seat_id: seat.seat_id,
//                                                                       price: seatType.price,
//                                                                   })
//                                                               }
//                                                           >
//                                                               {seatIndex + 1}
//                                                           </span>
//                                                       )}
//                                                   </div>
//                                               ))}
//                                           </div>
//                                       ))}
//                                   </div>
//                                   <br />
//                                   <br />
//                                   <br />
//                               </div>
//                           ))}
//                       </div>
//                   </div>
//               ))}
//           </div>
//       );
//   };

//   export default SelectSeatPage;


//   const handleBooking = async () => {
//     try {
//         const response = await axios.post(
//             https://movie-ticket-bookingapplication-1.onrender.com/booking/bookticket,
//             {
//                 showTime: selectedTime.showTime,
//                 showDate: date,
//                 movieId: _id, // Changed to _id which seems to be the correct parameter
//                 screenId: theater_id, // Ensure screen is defined
//                 seats: selectedSeats,
//                 totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
//                 paymentId: '123456789',
//                 paymentType: 'online',
//             },
//             { withCredentials: true }
//         );

//         if (response.data.ok) {
//             toast.success('Booking Successful');
//             console.log(response.data);
//         } else {
//             console.log(response.data);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

//     return (
//         <div className='selectseatpage'>
//             {movie && screen && (
//                 <div className='s1'>
//                     <div className='head'>
//                         <h1>{movie.title} - {screen?.screen?.name}</h1>
//                         {Array.isArray(movie.genre) && <h3>{movie.genre.join(' / ')}</h3>} {/* Check if movie.genre is an array */}
//                     </div>
//                 </div>
//             )}

//             {screen && (
//                 <div className='selectseat'>
//                     <div className='timecont'>
//                         {screen.movieSchedulesforDate.map((time, index) => (
//                             <h3
//                                 key={index}
//                                 className={selectedTime?._id === time._id ? 'time selected' : 'time'}
//                                 onClick={() => {
//                                     setSelectedTime(time);
//                                     setSelectedSeats([]);
//                                 }}
//                             >
//                                 {time.showTime}
//                             </h3>
//                         ))}
//                     </div>
//                     <div className='indicators'>
//                         <div>
//                             <span className='seat-unavailable'></span>
//                             <p>Not available</p>
//                         </div>
//                         <div>
//                             <span className='seat-available'></span>
//                             <p>Available</p>
//                         </div>
//                         <div>
//                             <span className='seat-selected'></span>
//                             <p>Selected</p>
//                         </div>
//                     </div>

//                     {generateSeatLayout()}

//                     <div className='totalcont'>
//                         <div className='total'>
//                             <h2>Total</h2>
//                             <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
//                         </div>
//                         <button className='theme_btn1 linkstylenone' onClick={handleBooking}>
//                             Book Now
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './SelectSeat.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SelectSeatPage = () => {
    const params = useParams();
    const { _id, date, theater_id } = params;

    const [screen, setScreen] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [movie, setMovie] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/theater/schedulebymovie/${theater_id}/${date}/${_id}`,
                    { withCredentials: true }
                );
                if (response.status === 200) {
                    const data = response.data;
                    console.log('Schedule Data:', data);
                    if (data && data.movieSchedulesforDate && data.movieSchedulesforDate.length > 0) {
                        setScreen(data);
                        setSelectedTime(data.movieSchedulesforDate[0]); // Initialize selectedTime
                    } else {
                        console.log(response.data);
                    }
                } else {
                    console.error('Failed to fetch movie schedule:', response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
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
                } else {
                    console.error('Failed to fetch movie details:', response.data);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovie();
    }, [_id]);

    const selectDeselectSeat = (seat) => {
        const isSelected = selectedSeats.find(
            (s) => s.row === seat.row && s.col === seat.col && s.seat_id === seat.seat_id
        );

        if (isSelected) {
            setSelectedSeats(
                selectedSeats.filter(
                    (s) => s.row !== seat.row || s.col !== seat.col || s.seat_id !== seat.seat_id
                )
            );
        } else {
            setSelectedSeats([...selectedSeats, seat]);
        }
    };

    const generateSeatLayout = () => {
        if (!screen || !selectedTime || !screen.movieSchedulesforDate) return null;

        return (
            <div>
                {screen.screen?.seats?.map((seatType, index) => (
                    <div className="seat-type" key={index}>
                        <h2>{seatType.type} - Rs. {seatType.price}</h2>
                        <div className='seat-rows'>
                            {seatType.rows?.map((row, rowIndex) => (
                                <div className="seat-row" key={rowIndex}>
                                    <p className="rowname">{row.rowname}</p>
                                    <div className="seat-cols">
                                        {row.cols?.map((col, colIndex) => (
                                            <div className="seat-col" key={colIndex}>
                                                {col.seats?.map((seat, seatIndex) => (
                                                    <div key={seatIndex}>
                                                        <span
                                                            className={
                                                                screen.movieSchedulesforDate[0]?.notAvailableSeats?.find(
                                                                    (s) =>
                                                                        s.row === row.rowname &&
                                                                        s.seat_id === seat.seat_id &&
                                                                        s.col === colIndex
                                                                )
                                                                    ? 'seat-unavailable'
                                                                    : selectedSeats.find(
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
                'https://movie-ticket-bookingapplication-1.onrender.com/booking/bookticket',
                {
                    showTime: selectedTime.showTime,
                    showDate: date,
                    movieId: _id,
                    screenId: theater_id,
                    seats: selectedSeats,
                    totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                    paymentId: '123456789',
                    paymentType: 'online',
                },
                { withCredentials: true }
            );

            if (response.data.ok) {
                console.log('Booking Successful:', response.data);
                // Handle success (e.g., show confirmation message)
            } else {
                console.error('Booking Failed:', response.data);
                // Handle failure (e.g., show error message)
            }
        } catch (error) {
            console.error('Error during booking:', error);
        }
    };

    return (
        <div className='selectseatpage'>
            {movie && screen && (
                <div className='s1'>
                    <div className='head'>
                        <h1>{movie.title} - {screen?.screen?.name}</h1>
                        {Array.isArray(movie.genre) && <h3>{movie.genre.join(' / ')}</h3>}
                    </div>
                </div>
            )}

            {screen && (
                <div className='selectseat'>
                    <div className='timecont'>
                        {screen.movieSchedulesforDate?.map((time, index) => (
                            <h3
                                key={index}
                                className={selectedTime?._id === time._id ? 'time selected' : 'time'}
                                onClick={() => {
                                    setSelectedTime(time);
                                    setSelectedSeats([]);
                                }}
                            >
                                {time.showTime}
                            </h3>
                        ))}
                    </div>
                    <div className='indicators'>
                        <div>
                            <span className='seat-unavailable'></span>
                            <p>Not available</p>
                        </div>
                        <div>
                            <span className='seat-available'></span>
                            <p>Available</p>
                        </div>
                        <div>
                            <span className='seat-selected'></span>
                            <p>Selected</p>
                        </div>
                    </div>

                    {generateSeatLayout()}

                    <div className='totalcont'>
                        <div className='total'>
                            <h2>Total</h2>
                            <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>
                        <button className='theme_btn1 linkstylenone' onClick={handleBooking}>
                            Book Now
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SelectSeatPage;
