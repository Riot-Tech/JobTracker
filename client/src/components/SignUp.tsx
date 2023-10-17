import React from "react";
import { useState, ChangeEvent } from "react";
import { AiOutlineClose } from 'react-icons/ai';
import { input } from "../models/interfaces";
import axios from "axios";
import { validateSignUpForm } from "../utils/validateSignUpForm";
import { URL } from "../utils/url";
import { hasErrors } from "../utils/utilities";
/* absolute top-[48%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 */
function SignUp({ close }: { close: (value: boolean) => void }) {
  
  const [input, setInput] = useState<input>({name:"", email: "", password: ""});
  const [errors, setErrors] = useState<input>({name:"", email:'', password:''})

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
          alert('User created! Congratulations')
          setInput({name:"", email: "", password: ""})
          setErrors({name:"", email: "", password: ""})
        } 
      }
    } catch (error) {
      console.log(error)
    }
  }
  /* console.log(input) */
  console.log(Object.values(errors).some((value)=> typeof(value)==='string'))
  return (
    <div className="absolute top-[48%] left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[600px] z-10 bg-slate-50 p-4 rounded-s-xl rounded-t-xl text-black shadow-lg">
      <div className='flex justify-between mb-2'>
        <h1 className='font-semibold'>SIGN UP</h1>
        <AiOutlineClose className='flex justify-items-start text-2xl hover: cursor-pointer' onClick={()=> close(false)} />
      </div>
        <h2 className='text-lg font-semibold border-b-2'>It's easy</h2>
      <form onSubmit={handleSubmit} className='mt-4'>
        <div className="flex flex-col my-4">
          <input
            className="p-2 rounded-lg"
            name="name"
            onChange={handleChange}
            placeholder="Full Name"
          />
          <p className="text-red-500 h-1">{errors.name}</p>
        </div>
        <div className="flex flex-col my-4">
          <input
            className="p-2 rounded-lg"
            name="email"
            onChange={handleChange}
            type="email"
            placeholder="Email adress"
          />
          <p className="text-red-500 h-1">{errors.email}</p>
        </div>

        <div className="flex flex-col my-4">
          <input
            className="p-2 rounded-lg"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <p className="text-red-500 h-1">{errors.password}</p>
        </div>
        
        <div className='flex justify-center mt-4'>
          <button disabled={hasErrors(errors)} type='submit' className={`items-center bg-red-700 rounded-lg text-white ${ hasErrors(errors) ? 'cursor-not-allowed' :''}`}>Create Account</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
