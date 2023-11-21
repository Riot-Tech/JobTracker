import axios from "axios";
import image from "../assets/job tracker log in.png";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";
import { validateLoginForm } from "../utils/validateLoginForm";
import SignUp from "../components/SignUp";
import { URL } from "../utils/url";
import GoogleButton from "../components/GoogleButton";
import { hasErrors } from "../utils/utilities";
import ErrorModalLogIn from "../modals/ErrorModalLogIn";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [passwordClear, setPasswordClear] = useState(false)
  const [signUpModal, setSignUpModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  
  const [input, setInput] = useState({email: "", password: ""});
  const [errors, setErrors] = useState({email:'', password:''})
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  
    const newErrors = validateLoginForm({
      ...input,
      [event.target.name]: event.target.value,
    });
  
    setErrors({
      ...errors,
      [event.target.name]: newErrors[event.target.name],
    });
  };

  const handleSubmit = async () => {
    try {
      let response = await axios.post(`${URL}/login`, input);
      if (response.status === 200 && Object.values(errors).length) {
        dispatch(createUser(response.data.user));
        navigate(`/${PrivateRoutes.HOME}`, { replace: true });
      }
    } catch (error: any) {
      setErrorModal(true)
      setErrorMessage(error.response.data.message)
    }
  };

  const closeModal = (value: boolean) => {
    setSignUpModal(value)
    setErrorModal(value)
    setErrorMessage('')
  }
  
  const handlePassword = () => {
    setPasswordClear(!passwordClear)
  }

  return (
    <div className={`flex min-w-full w-auto h-[100vh] z-0`}>
      {errorModal && <ErrorModalLogIn close={ closeModal } error={ errorMessage } />}
      <div className="w-[50%] h-full bg-white">
        <img
          className="flex flex-col w-[100%] h-[100%] justify-center p-40"
          src={image}
        />
      </div>
      <div className="w-[50%] h-full text-white bg-black p-36 px-30 flex flex-col justify-evenly">
        <h1 className="font-bold">Welcome! 👋</h1>

        <GoogleButton />

        <div className="flex flex-col">
          <label className="w-[20%] font-semibold mb-1">Email adress</label>
          <input
            className={`p-2 rounded-lg text-black ${errors.email? 'bg-red-300':''}`}
            name="email"
            onChange={handleChange}
            type="email"
            />
          <p className="text-red-500 h-3">{errors.email}</p>
        </div>
        <div className="relative flex flex-col">
          <label className="w-[10%] font-semibold mb-1">Password</label>
          <div className="flex justify-between items-center">
            <input
              className={`p-2 rounded-lg text-black w-full ${errors.password? 'bg-red-300':''}`}
              name="password"
              onChange={handleChange}
              type={`${passwordClear? "text": 'password'}`}
              />
            { !passwordClear ?  <IoEyeOff onClick={ handlePassword } className="absolute text-2xl text-black right-2 hover:cursor-pointer" /> : <IoEye onClick={ handlePassword } className="absolute text-2xl text-black right-2 hover:cursor-pointer" /> }
          </div>
            <p className="text-red-500 h-3">{errors.password}</p>
        </div>
        <button
          disabled={ hasErrors(errors) }
          type="submit"
          onClick={handleSubmit}
          className={`bg-red-700 rounded-lg ${ hasErrors(errors) ? 'cursor-not-allowed' :''}`}
          >
          Log in
        </button>
        <div className="flex relative">
          <h2>Don't have an account?</h2>
        {signUpModal ? 
        <div className="relative z-10">
          <h2 onClick={()=>{setSignUpModal(true)}} className="ml-1 underline hover:cursor-pointer">Create free account</h2>
          <SignUp close={ closeModal }/>
        </div>
        : <h2 onClick={()=>{setSignUpModal(true)}} className="ml-1 underline hover:cursor-pointer">Create free account</h2> }
        </div>
      </div>
    </div>
  );
}
