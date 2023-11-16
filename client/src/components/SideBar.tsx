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
import { useDispatch } from "react-redux";
import { handleSideBar } from "../redux/slices/sideBar.slice";
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";

function SideBar() {
  const location = useLocation();
  const dispatch = useDispatch()
  const sideBarOpen = useSelector((store: AppStore)=> store.sideBarOpen)

  const handleClick = () => {
    dispatch(handleSideBar(!sideBarOpen));
  };

  return (
    <div
      className={`w-[16%] ${!sideBarOpen && "w-[5%]"
        } min-h-[100%] flex flex-col bg-gray-300 dark:bg-gray-600`}
    >
      <div className={`h-[15%] mt-8`}>
        <div className="flex flex-col items-center">
          <button
            className={`mb-4 bg-transparent ${!sideBarOpen && "text-xs w-auto"}`}
            onClick={handleClick}
          >
            { !sideBarOpen? <VscMenu className='text-black text-2xl' /> : <GrClose className='flex justify-end' />}
          </button>
          <JobTrackerLogo />
        </div>
      </div>

      {sideBarOpen && (
        <h2 className="m-2 font-semibold text-gray-500 border-b-2 border-gray-600 dark:text-gray-300">
          MAIN MENU
        </h2>
      )}

      <div className={`h-[55%] ${!sideBarOpen && 'flex flex-col justify-evenly'}`}>
        {sideBarOpen ? (
          <Link to="/profile">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname === '/profile' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <ProfileLogo />

              <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                Profile
              </h2>
            </div>
          </Link>
        ) : (
          <Link to="/profile">
            <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 ${location.pathname === '/profile' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <ProfileLogo />
            </div>
          </Link>
        )}

        {sideBarOpen ? (
          <Link to="/files">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname === '/files' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <CvFilesLogo />
              <h2 className={`ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300`}>
                CV Files
              </h2>
            </div>
          </Link>
        ) : (
          <Link to="/files">
            <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 ${location.pathname === '/files' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <CvFilesLogo />
            </div>
          </Link>
        )}

        {sideBarOpen ? (
          <Link to="/applications">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname === '/applications' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <ApplicationsLogo />
              <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                Applications
              </h2>
            </div>
          </Link>
        ) : (
          <Link to="/applications">
            <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 ${location.pathname ===   '/applications' && 'bg-slate-400 border-r-4 border-red-800'}`}>
                <ApplicationsLogo />
            </div>
          </Link>
        )}

        {sideBarOpen ? (
          <Link to="/spontaneous">
            <div className={`flex items-center my-5 group hover:bg-slate-400 cursor-pointer p-4 ${location.pathname === '/spontaneous' && 'bg-slate-400 border-r-4 border-red-800'}`}>
              <SpontaneousLogo />
              <h2 className="ml-2 text-gray-500 group-hover:text-gray-800 dark:text-gray-300">
                Spontaneous
              </h2>
            </div>
          </Link>
        ) : (
          <Link to="/spontaneous">
            <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-2 ${location.pathname ===   '/spontaneous' && 'bg-slate-400 border-r-4 border-red-800'}`}>
                <SpontaneousLogo />
            </div>
          </Link>
        )}
      </div>

      <div className="flex justify-center m-5 h-[10%]">
        <Logout />
      </div>
    </div>
  );
}

export default SideBar;
