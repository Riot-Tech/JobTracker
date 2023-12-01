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
import style from './SideBar.module.css'

function SideBarMobile() {
  const location = useLocation();
  const dispatch = useDispatch()
  const sideBarOpen = useSelector((store: AppStore)=> store.sideBarOpen)
  const darkMode = useSelector((store: AppStore) => store.darkMode);

  const handleClick = () => {
    dispatch(handleSideBar(!sideBarOpen));
  };
  
  return (
    <div className={`flex fixed bottom-0 h-auto w-full justify-between bg-gray-300 dark:bg-gray-600 ${style.sideBar}`}>
      <div className={`h-full flex justify-around items-center`}>
      
        {/* logo JT */}

            <div className="flex justify-center items-center">
            <JobTrackerLogo />
            </div>
            
        {/* svgs */}
        
            
            <Link to="/profile">
                <div className={`flex items-center justify-center p-3 hover:bg-slate-400 cursor-pointer ${location.pathname === '/profile' && 'bg-slate-400 border-t-4 border-red-800'}`}>
                <ProfileLogo dark={darkMode} />
                </div>
            </Link>

            
            <Link to="/files">
                <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-3 ${location.pathname === '/files' && 'bg-slate-400 border-r-4 border-red-800'}`}>
                <CvFilesLogo dark={darkMode} />
                </div>
            </Link>

           
            <Link to="/applications">
                <div className={`flex items-center justify-center hover:bg-slate-400 cursor-pointer p-3 ${location.pathname ===   '/applications' && 'bg-slate-400 border-r-4 border-red-800'}`}>
                    <ApplicationsLogo dark={darkMode}/>
                </div>
            </Link>

           
            <Link to="/spontaneous">
                <div className={`flex items-center justify-center h-full hover:bg-slate-400 cursor-pointer p-3 ${location.pathname ===   '/spontaneous' && 'bg-slate-400 border-r-4 border-red-800'}`}>
                    <SpontaneousLogo dark={darkMode}/>
                </div>
            </Link>
        </div>

        <div className="flex justify-center">
            <div className="flex items-center gap-2 py-2">
                <h2 className="font-bold dark:text-white">Log Out</h2>
                <Logout />
            </div>
        </div>
    </div>
  );
}

export default SideBarMobile;