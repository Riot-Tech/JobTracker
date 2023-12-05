import { useLocation } from "react-router-dom"
import { CiSearch } from "react-icons/ci";
import { ChangeEvent } from "react"
import { searchSpontaneous } from "../redux/slices/spontaneous.slice"
import { useDispatch } from "react-redux"
import { searchApplication } from "../redux/slices/applications.slice"
import { searchFiles } from "../redux/slices/files.slice"
import style from './SearchBar.module.css'

function SearchBar() {
  const location = useLocation()
  const dispatch = useDispatch()

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if(location.pathname === '/spontaneous'){
      dispatch(searchSpontaneous(event.target.value))
    }

    if(location.pathname === '/applications'){
      dispatch(searchApplication(event.target.value))
    }

    if(location.pathname === '/files'){
      dispatch(searchFiles(event.target.value))
    }
  }

  return (
    <div className={`flex items-center h-full w-[50%] p-2 ml-10 ${style.searchBar}`}>
        <input onChange={handleSearch} placeholder="Search..." className={`relative ${style.input} margin-auto rounded-s-md shadow-lg text-black  border-slate-200`}/>
        <CiSearch className={`${style.searchIcon} relative right-10 p-1 border-l-2 border-gray-400 hover: cursor-pointer`} />
    </div>
  )
}

export default SearchBar