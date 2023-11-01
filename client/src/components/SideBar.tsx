import { useState } from "react";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import { VscMenu } from "react-icons/vsc";
import {
  ApplicationsLogo,
  CvFilesLogo,
  JobTrackerLogo,
  ProfileLogo,
  SpontaneousLogo,
} from "../utils/svg";

function SideBar() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`w-[12%] ${
        !isOpen && "w-[5%]"
      } h-[100vh] flex flex-col bg-gray-300 dark:bg-gray-600`}
    >
      <div className={`h-[15%] mt-10`}>
        <div className="flex flex-col items-center">
          <button
            className={`mb-4 ${!isOpen && "text-xs w-auto"}`}
            onClick={handleClick}
          >
            <VscMenu />
          </button>
          <JobTrackerLogo />
        </div>
      </div>

      {isOpen && (
        <h2 className="m-2 font-semibold text-gray-500 border-b-2 border-gray-600 dark:text-gray-300">
          MAIN MENU
        </h2>
      )}

      <div className={`h-[55%] ${ !isOpen && 'flex flex-col  items-center justify-evenly'}`}>
        {isOpen ? (
          <div className="flex items-center m-5 group hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <ProfileLogo />

            <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
              Profile
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <ProfileLogo />
          </div>
        )}

        {isOpen ? (
          <div className="flex items-center m-5 group hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <CvFilesLogo />
            <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
              CV Files
            </h2>
          </div>
        ) : (
          <div className="flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <CvFilesLogo />
          </div>
        )}

        {isOpen ? (
          <div className="flex items-center m-5 group hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <ApplicationsLogo />
            <Link to="/applications">
              <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                Applications
              </h2>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <Link to="/applications">
              <ApplicationsLogo />
            </Link>
          </div>
        )}

        {isOpen ? (
          <div className="flex items-center m-5 group hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
            <Link to="/spontaneous">
              <SpontaneousLogo />
              <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                Spontaneous
              </h2>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 rounded-xl">
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
