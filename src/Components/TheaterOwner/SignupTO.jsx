import { useForm } from "react-hook-form";
import "./AuthTO.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

const userSchema = yup
  .object({
    name: yup.string().required(),
    location: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const SignupTO = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

    const onSubmit = async(data) => {
      try {
        const res = await axios.post(
          "https://movie-ticket-bookingapplication.onrender.com/admin/adminsignup",
          data,)
          console.log(res.data);
          navigate('/theaterowner/login');
      } catch (error) {
        console.log(error)
      }}
    

  return (
    <div className="container d-flex align-items-center justify-content-center ">
      <div className="SignUp">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h2>SIGNUP</h2>
        <div className="name">
          <input
            {...register("name")}
            placeholder="Name"
            className="inputs"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="location">
          <input
            {...register("location")}
            placeholder="Location"
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

        <input type="Submit" className="inputs submit-input" />
        <p>
              if you already have an account <Link to='/theaterowner/login'>LogIn</Link>
        </p>
      </form>
    </div>
    </div>
    
  );
};
export default SignupTO;
