import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../models/routes";

function Home() { //rfce
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = ()=>{
        dispatch(resetUser())
        navigate(`/${PublicRoutes.LOGIN}` , {replace: true})
    }

  return (
    <div>
      Home
      <button onClick={logOut}>Log out</button>
    </div>
  );
}

export default Home;
