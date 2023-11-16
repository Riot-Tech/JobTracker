import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../redux/slices/auth.slice";
import { PublicRoutes } from "../models/routes";
import { BiLogOut } from 'react-icons/bi'

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
    // limpiar todos las applications, spontaneous, files etc
  };
  return (
    <div>
      <BiLogOut className="flex items-center justify-center bg-transparent text-gray-600 text-5xl hover:cursor-pointer border-gray-600 dark:text-gray-300 pr:2" onClick={logOut}/>
    </div>
  );
}

export default Logout;
