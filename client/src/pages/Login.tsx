import axios from "axios";
import image from "../assets/job tracker log in.png";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import { validateLoginForm } from "../utils/validateLoginForm";
import { input } from "../models/interfaces";
import SignUp from "../components/SignUp";
import { URL } from "../utils/url";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)

  const clientID: string =
    "551984613021-dc5t6e98fs62qfli3o8fa16vuujchb25.apps.googleusercontent.com";

  const onSuccess = async (response: any) => {
    try {
      let backResponse = await axios.post(`${URL}/login`, response.profileObj);
      if (backResponse.status === 200) {
        dispatch(createUser(backResponse.data));
        navigate(`/${PrivateRoutes.HOME}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (response: any) => {
    console.log("Something went wrong");
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const [input, setInput] = useState<input>({email: "", password: ""});
  const [errors, setErrors] = useState<input>({email:'', password:''})

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
      [event.target.name]: newErrors[event.target.name] || "",
    });
  };

  const handleSubmit = async () => {
    try {
      let response = await axios.post("http://localhost:3001/login", input);
      if (response.status === 200 && Object.values(errors).length) {
        dispatch(createUser(response.data.user));
        navigate(`/${PrivateRoutes.HOME}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = (value: boolean) => {
    setShowModal(value)
  }

  return (
    <div className="flex min-w-full w-auto h-[100vh] z-0">
      <div className="w-[50%] h-full bg-white">
        <img
          className="flex flex-col w-[100%] h-[100%] justify-center"
          src={image}
        />
      </div>
      <div className="w-[50%] h-full text-white bg-black p-20 px-30 flex flex-col justify-evenly">
        <h1>Welcome Back! 👋</h1>

        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Continue with Google"
          cookiePolicy={"single_host_origin"}
        />

        <div className="flex flex-col">
          <label className="w-[20%]">Email adress</label>
          <input
            className="p-2 rounded-lg"
            name="email"
            onChange={handleChange}
            type="email"
            />
          <p className="text-red-500 h-1">{errors.email}</p>
        </div>
        <div className="flex flex-col">
          <label className="w-[10%]">Password</label>
          <input
            className="p-2 rounded-lg"
            name="password"
            onChange={handleChange}
            type="password"
            />
          <p className="text-red-500 h-1">{errors.password}</p>
        </div>
        <button
          disabled={ !Object.values(errors).length }
          type="submit"
          onClick={handleSubmit}
          className="bg-red-700 rounded-lg"
          >
          Log in
        </button>
        <div className="flex">
          <h2>Don't have an account?</h2>
          <h2 onClick={()=>{setShowModal(true)}} className="ml-1 underline hover:cursor-pointer">Create free account</h2>
        { showModal && <SignUp close={ closeModal }/> }
        </div>
      </div>
    </div>
  );
}
