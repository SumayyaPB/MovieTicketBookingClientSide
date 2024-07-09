// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// // import './ProfilePage.css';

// const ProfilePage = () => {
//   const [bookings, setBookings] = useState(null);
//   const [user, setUser] = useState(null);

//   const getBookings = async () => {
//     try {
//       const response = await axios.get(
//         `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/booking/getuserbookings`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data.ok) {
//         setBookings(response.data.data);
//       } else {
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const response = await axios.get(
//         `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/getuser`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//           withCredentials: true,
//         }
//       );

//       if (response.data.ok) {
//         setUser(response.data.data);
//       } else {
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getBookings();
//     getUserData();
//   }, []);

//   return (
//     <div className="profile">
//       <h1 className="head">Profile</h1>
//       <div className="user">
//         <h2>User Details</h2>
//         <div className="details">
//           <div className="detail">
//             <h3>Name</h3>
//             <p>{user?.firstName}</p>
//           </div>
//           <div className="detail">
//             <h3>Email</h3>
//             <p>{user?.email}</p>
//           </div>
          
//         </div>
//       </div>
//       <div className="bookings">
//         <h2>Bookings</h2>
//         <div className="details">
//           {bookings?.map((booking) => (
//             <div className="booking" key={booking._id}>
//               <div className="detail">
//                 <h3>Movie</h3>
//                 <p>{booking.movieId.title}</p>
//               </div>
//               <div className="detail">
//                 <h3>Screen</h3>
//                 <p>{booking.screenId.name}</p>
//               </div>
//               <div className="detail">
//                 <h3>Seats</h3>
//                 <p>
//                   {booking.seats.map((seat, index) => (
//                     <span key={index}>
//                       {seat.seat_id}
//                       {index < booking.seats.length - 1 ? ", " : ""}
//                     </span>
//                   ))}
//                 </p>
//               </div>
//               <div className="detail">
//                 <h3>Price</h3>
//                 <p>{booking.totalPrice}</p>
//               </div>
//               <div className="detail">
//                 <h3>Show Date</h3>
//                 <p>{new Date(booking.showDate).toLocaleDateString()}</p>
//               </div>
//               <div className="detail">
//                 <h3>Show Time</h3>
//                 <p>{booking.showTime}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
// import './ProfilePage.css';

const ProfilePage = () => {
  const [bookings, setBookings] = useState(null);
  const [user, setUser] = useState(null);

  const getBookings = async () => {
    try {
      const response = await axios.get(
        `https://movie-ticket-bookingapplication-1.onrender.com/api/v1/booking/bookingticket`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 && response.data.ok) {
        setBookings(response.data.data);
        console.log("Bookings data:", response.data.data);
      } else {
        console.error("Error fetching bookings:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserData = async () => {
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

      if (response.status === 200 && response.data.ok) {
        setUser(response.data.data);
        console.log("User data:", response.data.data);
      } else {
        console.error("Error fetching user data:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getBookings();
    getUserData();
  }, []);

  return (
    <div className="profile">
      <h1 className="head">Profile</h1>
      {user ? (
        <div className="user">
          <h2>User Details</h2>
          <div className="details">
            <div className="detail">
              <h3>Name</h3>
              <p>{user.firstName}</p>
            </div>
            <div className="detail">
              <h3>Email</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}
      <div className="bookings">
        <h2>Bookings</h2>
        <div className="details">
          {bookings ? (
            bookings.length > 0 ? (
              bookings.map((booking) => (
                <div className="booking" key={booking._id}>
                  <div className="detail">
                    <h3>Movie</h3>
                    <p>{booking.movieId.title}</p>
                  </div>
                  <div className="detail">
                    <h3>Screen</h3>
                    <p>{booking.screenId.name}</p>
                  </div>
                  <div className="detail">
                    <h3>Seats</h3>
                    <p>
                      {booking.seats.map((seat, index) => (
                        <span key={index}>
                          {seat.seat_id}
                          {index < booking.seats.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </p>
                  </div>
                  <div className="detail">
                    <h3>Price</h3>
                    <p>{booking.totalPrice}</p>
                  </div>
                  <div className="detail">
                    <h3>Show Date</h3>
                    <p>{new Date(booking.showDate).toLocaleDateString()}</p>
                  </div>
                  <div className="detail">
                    <h3>Show Time</h3>
                    <p>{booking.showTime}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No bookings found.</p>
            )
          ) : (
            <p>Loading bookings...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

