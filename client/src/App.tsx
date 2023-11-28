import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import Profile from "./pages/Profile";
import Spontaneous from "./pages/Spontaneous";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import { AuthGuard } from "./guard/auth.guard";
import Files from "./pages/Files";
import { URL } from "./utils/url";
import axios from "axios";
import { useEffect } from "react";
import { getApplications } from "./redux/slices/applications.slice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSpontaneous } from "./redux/slices/spontaneous.slice";
import { AppStore } from "./models/interfaces";
import { addFile } from "./redux/slices/files.slice";

function App() {
  const activeUser = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responseApps = (await axios.get(`${URL}/application//?id=${activeUser.id}`)).data;
        let responseSponts = (await axios.get(`${URL}/spontaneous/?id=${activeUser.id}`)).data;
        let responseFiles = (await axios.get(`${URL}/file/?id=${activeUser.id}`)).data;


        dispatch(getApplications(responseApps))
        dispatch(addSpontaneous(responseSponts))
        dispatch(addFile(responseFiles))
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={PrivateRoutes.PROFILE} />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path="*" element={<>ERROR 404 NOT FOUND</>} />

          <Route element={<AuthGuard />}>
            <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
            <Route path={PrivateRoutes.APPLICATIONS} element={<Applications />} />
            <Route path={PrivateRoutes.SPONTANEOUS} element={<Spontaneous />} />
            <Route path={PrivateRoutes.FILES} element={<Files />} />
          </Route>

        </Routes>
      </BrowserRouter>
  );
}

export default App;
