import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../models/routes";
import { gapi } from "gapi-script";
import GoogleLogin from "react-google-login";
import { URL } from "../utils/url";
  
function GoogleButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clientID: string =
    "551984613021-dc5t6e98fs62qfli3o8fa16vuujchb25.apps.googleusercontent.com";

  const onSuccess = async (response: any) => {
    try {
      let backResponse = await axios.post(`${URL}/login`, response.profileObj);
      if (backResponse.status === 200) {
        dispatch(createUser(backResponse.data));
        navigate(`/${PrivateRoutes.PROFILE}`, { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFailure = (response: any) => {
    console.log("Something went wrong");
  };

  useEffect(() => {
    const start = () => {
      gapi.auth2.init({
        clientId: clientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);
  
  return (
    <GoogleLogin
      className="w-full"
      clientId={clientID}
      onSuccess={onSuccess}
      onFailure={onFailure}
      buttonText="Continue with Google"
      cookiePolicy={"single_host_origin"}
    />
  );
}

export default GoogleButton;
