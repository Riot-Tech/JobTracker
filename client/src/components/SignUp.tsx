import React from "react";
import { useEffect } from 'react'
import { useState, ChangeEvent } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import axios from "axios";
import { validateSignUpForm } from "../utils/validateSignUpForm";
import { URL } from "../utils/url";
import { hasErrors } from "../utils/utilities";
import GoogleButton from "./GoogleButton";
import SignUpSuccess from "../modals/SignUpSuccess";
import ErrorModalSignUp from "../modals/ErrorModalSignUp";
import { IoEye, IoEyeOff } from "react-icons/io5";

function SignUp({ close }: { close: (value: boolean) => void }) {
  
  const [passwordClear, setPasswordClear] = useState(false)

  const [input, setInput] = useState({ name: "", email: "", password: "", linkedIn: "", gitHub: "", portfolio: "" })
  const [errors, setErrors] = useState({ name: "", email: "", password: "", linkedIn: "", gitHub: "", portfolio: "" })

  const [errorModal, setErrorModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

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

    setErrors(validateSignUpForm(
      {
        ...input,
        [event.target.name]: event.target.value,
      }
    ));

  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      if (!hasErrors(errors)) {
        const response = await axios.post(`${URL}/signUp`, input)
        if (response.status === 200) {
          setModalIsOpen(true)
          setInput({ name: "", email: "", password: "", linkedIn: "", gitHub: "", portfolio: "" })
          setErrors({ name: "", email: "", password: "", linkedIn: "", gitHub: "", portfolio: "" })
        }
      }
    } catch (error: any) {
      setErrorModal(true)
      setErrorMessage(error.response.data.message)
    }
  }

  const closeModal = (value: boolean) => {
    setErrorModal(value)
    setErrorMessage('')
  }

  const handlePassword = () => {
    setPasswordClear(!passwordClear)
  }

  return (
    <>
      {errorModal && <ErrorModalSignUp close={closeModal} error={errorMessage} />}
      {modalIsOpen && <SignUpSuccess />}
      <div className="absolute top-[-500px] w-[400px] h-[600px] z-10 bg-slate-200 p-4 rounded-lg text-black shadow-lg backdrop-blur-lg">
        <div className='flex justify-between mb-2'>
          <h1 className='font-semibold'>SIGN UP</h1>
          <AiOutlineClose className='flex justify-items-start text-2xl hover: cursor-pointer' onClick={() => close(false)} />
        </div>
        <h2 className='text-lg font-semibold border-b-2'>It's easy</h2>
        <form onSubmit={handleSubmit} className='mt-4'>
          <GoogleButton />
          <h1 className="flex justify-center">----- o -----</h1>
          <div className="flex w-full gap-2 p-2">
            <div className="w-1/2">
              <div className="flex flex-col my-4">
                <input
                  className={`shadow-xl p-2 rounded-lg ${errors.name ? 'bg-red-300' : ''}`}
                  name="name"
                  onChange={handleChange}
                  placeholder="Full Name"
                />
                <p className="text-red-500 h-1 my-2">{errors.name}</p>
              </div>
              <div className="flex flex-col my-4">
                <input
                  className={`shadow-xl p-2 rounded-lg ${errors.email ? 'bg-red-300' : ''}`}
                  name="email"
                  onChange={handleChange}
                  type="email"
                  placeholder="Email adress"
                />
                <p className="text-red-500 h-1 my-2">{errors.email}</p>
              </div>

              <div className="relative flex flex-col my-4">
                <div className="flex justify-between items-center">
                  <input
                    className={`shadow-xl p-2 rounded-lg w-full ${errors.password ? 'bg-red-300' : ''}`}
                    type={`${passwordClear ? "text" : 'password'}`}
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                  {!passwordClear ? <IoEyeOff onClick={handlePassword} className="absolute text-2xl text-black right-2 hover:cursor-pointer" /> : <IoEye onClick={handlePassword} className="absolute text-2xl text-black right-2 hover:cursor-pointer" />}
                </div>
                <p className="text-red-500 h-1 my-2">{errors.password}</p>
              </div>
            </div>

            {/* <div className="w-1/2">
              <div className="flex flex-col my-4">
                <input
                  className={`shadow-xl p-2 rounded-lg ${errors.linkedIn ? 'bg-red-300' : ''}`}
                  type="text"
                  name="linkedIn"
                  onChange={handleChange}
                  placeholder="LinkedIn"
                />
                <p className="text-red-500 h-1 my-2">{errors.linkedIn}</p>
              </div>
              <div className="flex flex-col my-4">
                <input
                  className={`shadow-xl p-2 rounded-lg ${errors.gitHub ? 'bg-red-300' : ''}`}
                  type="text"
                  name="gitHub"
                  onChange={handleChange}
                  placeholder="Git Hub"
                />
                <p className="text-red-500 h-1 my-2">{errors.gitHub}</p>
              </div>
              <div className="flex flex-col my-4">
                <input
                  className={`shadow-xl p-2 rounded-lg ${errors.portfolio ? 'bg-red-300' : ''}`}
                  type="text"
                  name="portfolio"
                  onChange={handleChange}
                  placeholder="Portfolio"
                />
                <p className="text-red-500 h-1 my-2">{errors.portfolio}</p>
              </div>
            </div> */}
          </div>


          <div className='flex justify-center mt-4'>
            <button disabled={hasErrors(errors)} type='submit' className={`items-center bg-red-700 rounded-lg text-white ${hasErrors(errors) ? 'cursor-not-allowed' : ''}`}>Create Account</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignUp;
