import { useForm } from "react-hook-form";
import "./authPage.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom'

const userSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  })
  .required();

const SignUpComponent = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  const onSubmit = async(data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        data,)
        console.log(res.data);
        navigate("/user/login")
    } catch (error) {
      console.log(error)
    }}
    

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
