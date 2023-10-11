import "./App.css";
import { BrowserRouter, Navigate, Route, RouterProvider, Routes } from "react-router-dom";
import { RootRouter } from "./pages/RootRouter";
import { PrivateRoutes, PublicRoutes } from "./models/routes";
import Profile from "./pages/Profile";
import Spontaneous from "./pages/Spontaneous";
import Applications from "./pages/Applications";
import Login from "./pages/Login";
import { AuthGuard } from "./guard/auth.guard";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path={PublicRoutes.LOGIN} element={<Login />} />
          <Route path="*" element={<>ERROR 404 NOT FOUND</>} />

          <Route element={<AuthGuard />}>
            <Route path={PrivateRoutes.HOME} element={<Home/> } />
            <Route path={PrivateRoutes.PROFILE} element={<Profile />} />
            <Route path={PrivateRoutes.APPLICATIONS} element={<Applications />} />
            <Route path={PrivateRoutes.SPONTANEOUS} element={<Spontaneous />} />
          </Route>

        </Routes>
      </BrowserRouter>
      {/* <RouterProvider router={RootRouter} /> */}
    </>
  );
}

export default App;
