import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../models/routes";
import Logout from "../components/Logout";

function Home() {
  //rfce
  return (
    <div>
        {/* ACA DEBERIA IR UNA SIDE BAR !!!!!!!!!!!!!!!!!!!!!!!! */}
      <Logout />
    </div>
  );
}

export default Home;
