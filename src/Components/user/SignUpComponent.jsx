import { useForm } from "react-hook-form";
import "./authPage.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'
// import { toast } from "react-toastify";

const userSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    city: yup.string().required()
  })
  .required();

const SignUpComponent = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const onSubmit = async(data) => {
    try {
      const res = await axios.post(
        "https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/register",
        data,)
        console.log(res.data);
        navigate("/user/login")
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Assuming 409 is the status code for "user already exists"
        setError("email", {
          type: "manual",
          message: "User already exists",
        });
      } else {
        setError("email", {
          type: "manual",
          message: "Registration failed",
        });
      }
      console.error(error);
    }
      
    }
    

  return (
    <div className="container ">
      <div className="SignUp">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>SIGNUP</h2>
        <div className="firstname">
          <input
            {...register("firstName")}
            placeholder="First Name"
            className="inputs"
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
        </div>
        <div className="lastname">
          <input
            {...register("lastName")}
            placeholder="Last Name"
            className="inputs"
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
        </div>
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
        <div className="city">
          <input
            {...register("city")}
            placeholder="city"
            className="inputs"
          />
          {errors.city && <p>{errors.city.message}</p>}
        </div>

        <input type="Submit" className="inputs submit-input" />
        <p>
          if you already have an account <Link to='/user/login'>Login</Link>
        </p>
        <p>
              if you are TheaterOwner <Link to='/theaterowner/login'>login</Link>
        </p>
      </form>
    </div>
    </div>
    
  );
};
export default SignUpComponent;
