
function SearchBar() {
  return (
    <div className="flex items-center p-10 bg-gray-200 ">
        <input placeholder="Search" className="w-[350px] p-2 text-black border-4 border-solid border-slate-200"/>
        <div className="relative right-10 hover: cursor-pointer">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.75C6.35 21.75 1.75 17.15 1.75 11.5C1.75 5.85 6.35 1.25 12 1.25C17.65 1.25 22.25 5.85 22.25 11.5C22.25 17.15 17.65 21.75 12 21.75ZM12 2.75C7.17 2.75 3.25 6.68 3.25 11.5C3.25 16.32 7.17 20.25 12 20.25C16.83 20.25 20.75 16.32 20.75 11.5C20.75 6.68 16.83 2.75 12 2.75Z" fill="#B2B2B2"/>
                <path d="M22.4999 22.75C22.3099 22.75 22.1199 22.68 21.9699 22.53L19.9699 20.53C19.6799 20.24 19.6799 19.76 19.9699 19.47C20.2599 19.18 20.7399 19.18 21.0299 19.47L23.0299 21.47C23.3199 21.76 23.3199 22.24 23.0299 22.53C22.8799 22.68 22.6899 22.75 22.4999 22.75Z" fill="#B2B2B2"/>
            </svg>
        </div>
    </div>
  )
}

export default SearchBar