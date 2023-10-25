import { useSelector } from "react-redux"
import SearchBar from "./SearchBar"
import { AppStore } from "../models/interfaces"
import { BsLightbulb, BsFillLightbulbFill } from 'react-icons/bs'
import { useState, useEffect, ChangeEvent } from "react";

function NavBar() {
  const activeUser = useSelector((store: AppStore)=> store.user)
  const [darkTheme, setDarkTheme] = useState(false)

  useEffect(()=>{
    if(darkTheme){
      document.querySelector('html')?.classList.add('dark')
    }else{
      document.querySelector('html')?.classList.remove('dark')
    }
  },[darkTheme])

  const handleTheme = ()=>{
    setDarkTheme(!darkTheme)
  }
console.log(darkTheme)
  return (
    <div className="flex h-[10%] w-full">
        <SearchBar/>
        <div className="flex items-center w-[30%] bg-gray-200 dark:bg-gray-500">
          <div className="flex justify-center">
            {darkTheme ? <BsLightbulb onClick={handleTheme} className='text-2xl text-black hover: cursor-pointer'/> : <BsFillLightbulbFill onClick={handleTheme} className='text-2xl text-black hover: cursor-pointer' />}
            <h2 className="text-gray-800">{activeUser.name}</h2>
          </div>

        </div>
        
    </div>
  )
}

export default NavBar