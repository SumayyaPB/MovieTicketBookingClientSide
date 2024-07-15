import { useForm } from "react-hook-form"
import './AuthTO.css';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const userSchema = yup
  .object({

    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const LoginTO=() =>{
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState : {errors}
  } = useForm({resolver : yupResolver(userSchema)})

  const onSubmit = async(data) => {
    try {
      const response = await axios.post("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/admin/adminLogin",data,{
      withCredentials: true,
      })
      console.log(response);
      sessionStorage.setItem('token',response.data.token)
      
        navigate('/theaterowner');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // Assuming 409 is the status code for "incorrect password"
          setError("password", {
            type: "manual",
            message: "Incorrect password",
          });
        } else if (error.response.status === 400) {
          // Assuming 400 is the status code for "user not found"
          setError("email", {
            type: "manual",
            message: "Email not found",
          });
        } else {
          // Handle other status codes
          setError("general", {
            type: "manual",
            message: "An unexpected error occurred",
          });
        }
      } else {
        // Handle network or other errors
        console.error("Error:", error);
        setError("general", {
          type: "manual",
          message: "A network error occurred",
        });
        console.log(error);
      }
    }
      
  }
    
  return (
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
              if you dont have an account <Link to='/theaterowner/signup'>SignUp</Link>
             </p>
        </form>
    </div>
  )
}
export default LoginTO