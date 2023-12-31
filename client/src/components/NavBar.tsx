import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { AppStore } from "../models/interfaces"
import { BsFillPersonFill } from 'react-icons/bs'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleDarkMode } from "../redux/slices/darkMode.slice";
import style from './NavBar.module.css';
import { IoMdMoon  } from "react-icons/io";
import { IoSunny } from "react-icons/io5";


function NavBar() {
  const dispatch = useDispatch()
  const activeUser = useSelector((store: AppStore)=> store.user)
  const [darkTheme, setDarkTheme] = useState(()=>{ //Persistencia del tema al apretar F5
    if(localStorage.getItem('theme')){
      return true
    }
    return false
  })

  useEffect(()=>{
    if(darkTheme){
      document.querySelector('html')?.classList.add('dark')
      localStorage.setItem('theme', JSON.stringify(true))
      dispatch(handleDarkMode(darkTheme))
    }else{
      document.querySelector('html')?.classList.remove('dark')
      localStorage.removeItem('theme')
      dispatch(handleDarkMode(darkTheme))
    }
  },[darkTheme])

  const handleTheme = ()=>{
    setDarkTheme(!darkTheme)
  }
  
  return (
    <div className={`flex items-center justify-evenly ${style.navBar} bg-gray-200 dark:bg-gray-500`}>
        <SearchBar/>
        <div className="flex justify-end gap-12 items-center h-full w-[50%] mr-5 bg-gray-200 py-2 mx-2 dark:bg-gray-500">
          <div className="flex items-center">
            <BsFillPersonFill className='text-[25px] text-gray-700 mr-2 dark:text-black' />
            <h2 className={`text-gray-800 font-semibold ${style.name}`}>{activeUser.name}</h2>
          </div>
            {darkTheme ? <IoSunny onClick={handleTheme} className='text-3xl text-white hover: cursor-pointer mr-5 hover:scale-110 transition-transform'/> : <IoMdMoon  onClick={handleTheme} className='text-3xl mr-5 text-black hover: cursor-pointer hover:scale-110 transition-transform' />}
        </div>
    </div>
  )
}

export default NavBar