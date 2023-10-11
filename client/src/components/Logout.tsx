import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../redux/slices/auth.slice";
import { PublicRoutes } from "../models/routes";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOut = () => {
    dispatch(resetUser());
    navigate(`/${PublicRoutes.LOGIN}`, { replace: true });
  };
  return (
    <div>
      <button onClick={logOut}>Log out</button>
    </div>
  );
}

export default Logout;
