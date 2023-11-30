import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { AppStore } from "../models/interfaces"
import { BsLightbulb, BsFillLightbulbFill, BsFillPersonFill } from 'react-icons/bs'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleDarkMode } from "../redux/slices/darkMode.slice";

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
    <div className="flex items-center h-[10vh] w-[full] bg-gray-200 dark:bg-gray-500">
        <div className="w-[70%]">
          <SearchBar/>
        </div>
        <div className="flex justify-evenly items-center w-[30%] bg-gray-200 p-10 dark:bg-gray-500">
          <div className="flex">
            <BsFillPersonFill className='text-2xl text-gray-700 mr-1 dark:text-black' />
            <h2 className="text-gray-800 dark:text-white">{activeUser.name}</h2>
          </div>
            {darkTheme ? <BsLightbulb onClick={handleTheme} className='text-4xl text-black hover: cursor-pointer'/> : <BsFillLightbulbFill onClick={handleTheme} className='text-4xl text-black hover: cursor-pointer' />}
        </div>
    </div>
  )
}

export default NavBar