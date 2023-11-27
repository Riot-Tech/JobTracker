import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import Profile from "./pages/Profile";
import Spontaneous from "./pages/Spontaneous";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import { AuthGuard } from "./guard/auth.guard";
import Files from "./pages/Files";

function App() {
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
