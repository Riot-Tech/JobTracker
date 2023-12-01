import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { AppStore } from "../models/interfaces"
import { BsLightbulb, BsFillLightbulbFill, BsFillPersonFill } from 'react-icons/bs'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleDarkMode } from "../redux/slices/darkMode.slice";
import { MdNightlightRound, MdOutlineLightMode } from "react-icons/md";

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
    <div className="flex items-center justify-evenly h-auto min-h-[10%] bg-gray-200 dark:bg-gray-500">
        <div className="h-full flex justify-start ml-6 items-center w-[50%]">
          <SearchBar/>
        </div>
        <div className="flex justify-end gap-12 items-center h-full w-[50%] mr-5 bg-gray-200 py-2 mx-2 dark:bg-gray-500">
          <div className="flex items-center">
            <BsFillPersonFill className='text-[40px] text-gray-700 mr-1 dark:text-black' />
            <h2 className="text-gray-800 text-[20px] font-semibold">{activeUser.name}</h2>
          </div>
            {darkTheme ? <MdOutlineLightMode onClick={handleTheme} className='text-4xl text-black hover: cursor-pointer'/> : <MdNightlightRound onClick={handleTheme} className='text-4xl text-black hover: cursor-pointer' />}
        </div>
    </div>
  )
}

export default NavBar