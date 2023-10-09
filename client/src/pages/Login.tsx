import image from '../assets/job tracker log in.png'
import { useState,  ChangeEvent } from 'react'

export default function Login() {
    interface input {
        email: string;
        password: string;
      }
    const [input, setInput] = useState<input>({
        email: "",
        password:""
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })

    }
    console.log(input)
    /* const handleSubmit = (event) =>{
        event.preventDefault()
    }
 */
  return (
    <div className="flex min-w-full h-[100vh]">
      <div className="w-[50%] h-full bg-white">
        <img className='flex flex-col w-[100%] justify-center' src={image}/>
      </div>
      <div className="w-[50%] h-full text-white bg-black p-20 px-30 flex flex-col justify-evenly">
        <h1>Welcome Back</h1>
        <div className="flex flex-col">
          <label className="w-[20%]">Email adress</label>
          <input name='email' onChange={handleChange} type="email" />
        </div>
        <div className="flex flex-col">
          <label className="w-[10%]">Password</label>
          <input name='password' onChange={handleChange} type="password" />
        </div>
        <button className="bg-red-700 rounded-lg">Log in</button>
        <h2>Don't have an account? Create free account</h2>
      </div>
    </div>
  );
}
