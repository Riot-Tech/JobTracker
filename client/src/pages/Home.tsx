import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../models/routes";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div className="flex">
      <div className="w-[12%] h-[100vh] flex flex-col">
        <SideBar />
      </div>

      <div className="w-[88%] h-[100vh]">
        <div className="flex h-[10%] w-full">
          <NavBar/>
        </div>
        <div className="h-[90%] bg-white w-full">
          <h1>Sector variable</h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
