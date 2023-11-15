import { useLocation } from "react-router-dom"
import { SearchIcon } from "../utils/svg"
import { ChangeEvent } from "react"
import { searchSpontaneous } from "../redux/slices/spontaneous.slice"
import { useDispatch } from "react-redux"

function SearchBar() {
  const location = useLocation()
  const dispatch = useDispatch()

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    if(location.pathname === '/spontaneous'){
      console.log('entre')
      //quiero hacer la busqueda en el front, sin tener que ir al back
      //voy a modificar el estado global de las spontaneous a traves de una action
      console.log(event.target.value) 
      dispatch(searchSpontaneous(event.target.value))
    }

  }

  return (
    <div className="flex items-center p-10 bg-gray-200 w-[70%] dark:bg-gray-500">
        <input onChange={handleSearch} placeholder="Search" className="w-[350px] p-3 text-black border-1 border-solid border-slate-200"/>
        <div className="relative right-10 hover: cursor-pointer">
            <SearchIcon/>
        </div>
    </div>
  )
}

export default SearchBar