import { useLocation } from "react-router-dom"
import { SearchIcon } from "../utils/svg"
import { ChangeEvent } from "react"
import { searchSpontaneous } from "../redux/slices/spontaneous.slice"
import { useDispatch } from "react-redux"
import { searchApplication } from "../redux/slices/applications.slice"
import { searchFiles } from "../redux/slices/files.slice"

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
    <div className="flex items-center p-10">
        <input onChange={handleSearch} placeholder="Search..." className="w-[350px] p-3 text-black border-1 border-solid border-slate-200"/>
        <div className="relative right-10 hover: cursor-pointer border-l-2 border-gray-400 p-1">
            <SearchIcon/>
        </div>
    </div>
  )
}

export default SearchBar