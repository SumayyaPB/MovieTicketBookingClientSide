import { useForm } from "react-hook-form"
import './authPage.css';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {Link, useNavigate} from 'react-router-dom'
const userSchema = yup
  .object({

    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const LoginComponent=() =>{
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState : {errors}
  } = useForm({resolver : yupResolver(userSchema)})

  const onSubmit = async(data) => {
    try {
      const response = await axios.post("https://movie-ticket-bookingapplication.onrender.com/user/login",data,{
      withCredentials: true,
      })
      console.log(response);
      sessionStorage.setItem('token',response.data.token)
      navigate('/');

      
    } catch (error) {
      console.log(error);

    }}

  

  return (
    <div className="container">
      <div className="login">
        <form onSubmit={handleSubmit(onSubmit)} className="form">
             <h2>LOGIN</h2>
             <div className="email">
          <input
            {...register("email")}
            placeholder="Email"
            className="inputs"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="password">
          <input
            {...register("password")}
            placeholder="Password"
            className="inputs"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
            <input type="Submit" className="inputs submit-input"/>
             <p>
              if you dont have an account <Link to='/user/signup'>SignUp</Link>
             </p>
             <p>
              if you are TheaterOwner <Link to='/theaterowner/login'>login</Link>
             </p>
        </form>
    </div>
    
    </div>

  )
}
export default LoginComponent
// eslint-disable-next-line no-unused-vars
// import React from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types"; // Import PropTypes

// const userSchema = yup.object({
//   email: yup.string().email().required(),
//   password: yup.string().required().min(6),
// }).required();

// const LoginComponent = ({ handleLogin }) => { // Receive handleLogin as prop
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(userSchema) });

//   const onSubmit = async (data) => {
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/api/v1/user/login",
//         data
//       );
//       console.log(res.data);
//       // Assuming successful login, call handleLogin to update isLoggedIn state
//       handleLogin(); // Call handleLogin from props
//       navigate('/'); // Redirect to home page after successful login
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="login">
//         <form onSubmit={handleSubmit(onSubmit)} className="form">
//           <h2>LOGIN</h2>
//           <div className="email">
//             <input
//               {...register("email")}
//               placeholder="Email"
//               className="inputs"
//             />
//             {errors.email && <p>{errors.email.message}</p>}
//           </div>
//           <div className="password">
//             <input
//               {...register("password")}
//               placeholder="Password"
//               className="inputs"
//             />
//             {errors.password && <p>{errors.password.message}</p>}
//           </div>
//           <input type="submit" className="inputs submit-input" />
//           <p>
//             if you dont have an account <Link to="/user/signup">SignUp</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Define propTypes for handleLogin prop
// LoginComponent.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
// };

// export default LoginComponent;
