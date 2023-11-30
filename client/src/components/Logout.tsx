import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../redux/slices/auth.slice";
import { PublicRoutes } from "../models/routes";
import { BiLogOut } from 'react-icons/bi'
import { addSpontaneous } from "../redux/slices/spontaneous.slice";
import { createApplication } from "../redux/slices/applications.slice";
import { addFile } from "../redux/slices/files.slice";
import { AppStore } from "../models/interfaces";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideBarOpen = useSelector((store: AppStore)=> store.sideBarOpen)
  
  const logOut = () => {
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    // limpiar todos las applications, spontaneous, files etc
    dispatch(addSpontaneous([]))
    dispatch(createApplication([]))
    dispatch(addFile([]))
  };
  return (
    <div>
      <BiLogOut className={`flex items-center justify-center bg-transparent text-gray-600 ${!sideBarOpen ? 'text-3xl' : 'text-4xl'} hover:cursor-pointer border-gray-600 dark:text-gray-300 pr:2`} onClick={logOut}/>
    </div>
  );
}

export default Logout;
