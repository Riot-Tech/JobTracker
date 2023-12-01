import axios from "axios";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";
import hexagon from "../assets/hexagon.png";
import { URL } from "../utils/url";
import { useState, ChangeEvent, useEffect } from "react";
import { updateUser } from "../redux/slices/auth.slice";
import {
  EditIcon,
  LinkedInIcon,
  TickIcon,
  GitHubIcon,
  PortfolioIcon,
} from "../utils/svg";
import { validateLink } from "../utils/validateProfileLinks";
import { hasErrors } from "../utils/utilities";
import SideBarMobile from "../components/SideBarMobile";

export default function Profile() {
  const dispatch = useDispatch();

  const activeUser = useSelector((store: AppStore) => store.user);
  const applications = useSelector((store: AppStore) => store.applications);
  const spontaneous = useSelector((store: AppStore) => store.spontaneous);
  const files = useSelector((store: AppStore) => store.filesState);
  const darkMode = useSelector((store: AppStore) => store.darkMode);
  
  const [isEditing, setIsEditing] = useState(false);

  const [input, setInput] = useState({
    id: activeUser.id,
    name: activeUser.name,
    email: activeUser.email,
    linkedIn: activeUser.linkedIn || "",
    gitHub: activeUser.gitHub || "",
    portfolio: activeUser.portfolio || "",
    profilePicture: "",
    enabled: true,
  });

  const [errors, setErrors] = useState({
    linkedIn: "",
    gitHub: "",
    portfolio: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
   
    const fetchData = async () => {
      try {
        let { data } = await axios.get(`${URL}/user/${activeUser.id}`);
        dispatch(updateUser(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleChange = async (
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>
  ) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validateLink({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      if (!hasErrors(errors)) {
        const res = await axios.patch(`${URL}/user/`, input);
        if (res.status === 200) {
          dispatch(updateUser(input));
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  console.log(isMobile)
  return (
    <div className="flex h-screen w-screen ">
      {!isMobile ? <SideBar /> : null}
      <div className="flex flex-col h-full w-screen">
        <NavBar />
        {isMobile ? <SideBarMobile/> : null}
        
      </div>
    </div>
  );
}
