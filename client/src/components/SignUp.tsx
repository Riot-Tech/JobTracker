import React from "react";
import { useEffect } from 'react'
import { useState, ChangeEvent } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { input } from "../models/interfaces";
import axios from "axios";
import { validateSignUpForm } from "../utils/validateSignUpForm";
import { URL } from "../utils/url";
import { hasErrors } from "../utils/utilities";
import GoogleLogin from "react-google-login";
import GoogleButton from "./GoogleButton";
import SignUpSuccess from "../modals/SignUpSuccess";
/* absolute top-[48%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 */
function SignUp({ close }: { close: (value: boolean) => void }) {

  const [input, setInput] = useState<input>({name:"", email: "", password: ""});
  const [errors, setErrors] = useState<input>({name:"", email:'', password:''})

  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      const timeoutId = setTimeout(() => {
        setModalIsOpen(false);
      }, 1200); // Ocultar el modal después de 5 segundos (5000 ms)

      // Limpia el temporizador si el componente se desmonta antes de que se oculte el modal
      return () => clearTimeout(timeoutId);
    }
  }, [modalIsOpen]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  
    const newErrors = validateSignUpForm({
      ...input,
      [event.target.name]: event.target.value,
    });

    setErrors({
      ...errors,
      [event.target.name]: newErrors[event.target.name],
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault()

    try {
      if(!hasErrors(errors)){
        const response = await axios.post(`${URL}/signUp`, input)
        if(response.status === 200){
          setModalIsOpen(true)
          setInput({name:"", email: "", password: ""})
          setErrors({name:"", email: "", password: ""})
        } 
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="absolute top-[48%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] z-10 bg-slate-200 p-4 rounded-s-xl rounded-t-xl text-black shadow-lg">
      {modalIsOpen && <SignUpSuccess />}
      <div className='flex justify-between mb-2'>
        <h1 className='font-semibold'>SIGN UP</h1>
        <AiOutlineClose className='flex justify-items-start text-2xl hover: cursor-pointer' onClick={()=> close(false)} />
      </div>
        <h2 className='text-lg font-semibold border-b-2'>It's easy</h2>
      <form onSubmit={handleSubmit} className='mt-4'>
      <GoogleButton/>
      <h1>----- o -----</h1>
        <div className="flex flex-col my-4">
          <input
            className={`shadow-xl p-2 rounded-lg ${errors.name? 'bg-red-300':''}`}
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
          />
          <p className="text-red-500 h-1 my-2">{errors.name}</p>
        </div>
        <div className="flex flex-col my-4">
          <input
            className={`shadow-xl p-2 rounded-lg ${errors.email? 'bg-red-300':''}`}
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email adress"
          />
          <p className="text-red-500 h-1 my-2">{errors.email}</p>
        </div>

        <div className="flex flex-col my-4">
          <input
            className={`shadow-xl p-2 rounded-lg ${errors.password? 'bg-red-300':''}`}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <p className="text-red-500 h-1 my-2">{errors.password}</p>
        </div>
        
        <div className='flex justify-center mt-4'>
          <button disabled={hasErrors(errors)} type='submit' className={`items-center bg-red-700 rounded-lg text-white ${ hasErrors(errors) ? 'cursor-not-allowed' :''}`}>Create Account</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
