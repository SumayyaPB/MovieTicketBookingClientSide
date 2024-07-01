import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./Pages/Root";
import App from "./App";
import LoginPage from "./Pages/User/LoginPage";
import SignUpPage from "./Pages/User/SignUpPage";
import TheaterOwnerSignUpPage from "./Pages/TheaterOwner/TheaterOwnerSignUpPage";
import TheaterOwnerLoginPage from "./Pages/TheaterOwner/ThearerOwnerLoginPage";
import TheaterOwnerHomePage from "./Pages/TheaterOwner/TheaterOwnerHomePage";
import CreateMovie from "./Components/TheaterOwner/movie/CreateMovie";
import AddTheater from "./Components/TheaterOwner/Theater/AddTheater";
// import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import MovieSchedule from "./Components/TheaterOwner/Theater/MovieSchedule";
import SidebarPage from "./Pages/TheaterOwner/SidebarPage";
import DeleteTheater from "./Components/TheaterOwner/Theater/DeleteTheater";

import BookingPage from "./Pages/User/BuyTicket";

// import UserSidebar from "./Components/user/UserSidebar";

import MoviePage from "./Pages/User/MoviePage";
import SelectSeatPage from "./Pages/User/SelectSeatPage";
import ProfilePage from "./Components/user/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/user/login",
    element: <LoginPage />,
  },
  {
    path: "/user/signup",
    element: <SignUpPage />,
  },
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path:'/movies/:_id',
        element:<MoviePage/>
      },
      {
        path: "/movies/:_id/buytickets",
        element: <BookingPage />,
      },
      {
        path: `/theater/:theater_id/:date/:_id`,
        element: <SelectSeatPage />
      },
      
      
      {
        path: "/userDashboard",
        // element: <UserSidebar/>,
        element: <ProfilePage/>
        
      }
    ]
  }, 
  // TheaterOwner
  {
    path: "/theaterowner/signup",
    element: <TheaterOwnerSignUpPage />,
  },
  {
    path: "/theaterowner/login",
    element: <TheaterOwnerLoginPage />,
  },
  {
    path: "/",
    element: <SidebarPage />,
    children: [
      {
        path: "/theaterowner",
        element: <TheaterOwnerHomePage />,
      },
     
      {
        path: "/theaterowner/components/movie/createmovie",
        element: <CreateMovie />,
      },
      {
        path: "/theaterowner/components/theater/addtheater",
        element: <AddTheater />,
      },
      {
        path: "/theaterowner/components/theater/addmovieschedules",
        element: <MovieSchedule />,
      },
      {
        path: "/theaterowner/components/theater/deleteTheater",
        element: <DeleteTheater />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
