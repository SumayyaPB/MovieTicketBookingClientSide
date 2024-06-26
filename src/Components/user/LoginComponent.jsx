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
      const response = await axios.post("https://movie-ticket-bookingapplication-1.onrender.com/api/v1/user/login",data,{
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
