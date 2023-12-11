import Logout from "./Logout";
import { Link } from "react-router-dom";
import {
  ApplicationsLogo,
  CvFilesLogo,
  JobTrackerLogo,
  ProfileLogo,
  SpontaneousLogo,
} from "../utils/svg";
import { useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";
import style from './SideBarMobile.module.css'

function SideBarMobile() {
  const location = useLocation();
  const darkMode = useSelector((store: AppStore) => store.darkMode);

  return (
    <div className={`flex sticky bottom-0 w-full justify-around bg-gray-300 dark:bg-gray-600`}>
        
        {/* logo JT */}
        <div className="flex justify-center items-center">
            <JobTrackerLogo />
        </div>

        {/* svgs */}
        <div className={`h-full flex justify-evenly gap-4 items-center`}>

            <Link to="/profile" className="h-full">
                <div className={`flex items-center justify-center h-full p-3 hover:bg-slate-400 cursor-pointer ${location.pathname === '/profile' && 'bg-slate-400 border-t-4 border-red-800'}`}>
                <ProfileLogo dark={darkMode} />
                </div>
            </Link>

            
            <Link to="/files" className="h-full">
                <div className={`flex items-center justify-center h-full hover:bg-slate-400 cursor-pointer p-3 ${location.pathname === '/files' && 'bg-slate-400 border-t-4 border-red-800'}`}>
                <CvFilesLogo dark={darkMode} />
                </div>
            </Link>

           
            <Link to="/applications" className="h-full">
                <div className={`flex items-center justify-center h-full hover:bg-slate-400 cursor-pointer p-3 ${location.pathname ===   '/applications' && 'bg-slate-400 border-t-4 border-red-800'}`}>
                    <ApplicationsLogo dark={darkMode}/>
                </div>
            </Link>

           
            <Link to="/spontaneous" className="h-full">
                <div className={`flex items-center justify-center h-full hover:bg-slate-400 cursor-pointer p-3 ${location.pathname ===   '/spontaneous' && 'bg-slate-400 border-t-4 border-red-800'}`}>
                    <SpontaneousLogo dark={darkMode}/>
                </div>
            </Link>
        </div>

        <div className="flex justify-center">
            <div className="flex items-center gap-2 py-2">
                <h2 className={`font-bold dark:text-white ${style.logOutName}`}>Log Out</h2>
                <Logout />
            </div>
        </div>
    </div>
  );
}

export default SideBarMobile;