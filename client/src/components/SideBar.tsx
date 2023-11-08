import { useState } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import { GrClose } from "react-icons/gr";
import {
  ApplicationsLogo,
  CvFilesLogo,
  JobTrackerLogo,
  ProfileLogo,
  SpontaneousLogo,
} from "../utils/svg";
import { useLocation } from 'react-router-dom';

function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const location = useLocation();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div
      className={`w-[16%] ${
        !isOpen && "w-[5%]"
      } min-h-[100%] flex flex-col bg-gray-300 dark:bg-gray-600`}
    >
      <div className={`h-[15%] mt-8`}>
        <div className="flex flex-col items-center">
          <button
            className={`mb-4 bg-transparent ${!isOpen && "text-xs w-auto"}`}
            onClick={handleClick}
          >
            { !isOpen? <VscMenu className='text-black text-2xl' /> : <GrClose className='flex justify-end' />}
          </button>
          <JobTrackerLogo />
        </div>
      </div>

      {isOpen && (
        <h2 className="m-2 font-semibold text-gray-500 border-b-2 border-gray-600 dark:text-gray-300">
          MAIN MENU
        </h2>
      )}

      <div className={`h-[55%] ${ !isOpen && 'flex flex-col justify-evenly'}`}>
        {isOpen ? (
          <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4`}>
            <ProfileLogo />

            <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
              Profile
            </h2>
          </div>
        ) : (
          <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2`}>
            <ProfileLogo />
          </div>
        )}

        {isOpen ? (
          <Link to="/files">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname=== '/files' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <CvFilesLogo />
              <h2 className={`ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300`}>
                CV Files
              </h2>
            </div>
          </Link>
        ) : (
          <Link to="/files">
            <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2`}>
              <CvFilesLogo />
            </div>
          </Link>
        )}

        {isOpen ? (
          <Link to="/applications">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname=== '/applications' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <ApplicationsLogo />
                <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                  Applications
                </h2>
            </div>
          </Link>
        ) : (
          <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 ${location.pathname=== '/applications' && 'bg-slate-400 border-r-4 border-red-800'}`}>
            <Link to="/applications">
              <ApplicationsLogo />
            </Link>
          </div>
        )}

        {isOpen ? (
          <Link to="/spontaneous">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname=== '/spontaneous' && 'bg-slate-400 border-r-4 border-red-800'}`}>
                <SpontaneousLogo />
                <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                  Spontaneous
                </h2>
            </div>
          </Link>
        ) : (
          <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 ${location.pathname === '/spontaneous' && 'bg-slate-400 border-r-4 border-red-800'}`}>
            <Link to="/spontaneous">
              <SpontaneousLogo />
            </Link>
          </div>
        )}
      </div>

      <div className="flex justify-center m-5 h-[10%]">
        <Logout />
      </div>
    </div>
  );
}

export default SideBar;
