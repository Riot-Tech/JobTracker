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
import style from './Profile.module.css'

export default function Profile() {
  const dispatch = useDispatch();

  const activeUser = useSelector((store: AppStore) => store.user);
  const applications = useSelector((store: AppStore) => store.applications);
  const spontaneous = useSelector((store: AppStore) => store.spontaneous);
  const files = useSelector((store: AppStore) => store.filesState);
  const darkMode = useSelector((store: AppStore) => store.darkMode);

  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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



  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
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

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {!isMobile ? <SideBar /> : null}
      <div className="flex flex-col justify-between h-full w-full">
        <NavBar />

        <div className={`relative flex flex-col w-full h-full items-center bg-custom-backLight dark:bg-custom-backDark overflow-y-auto`}>
          <div className={`absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg ${style.profileBar}`}>
            <h3 className="text-white text-2xl font-bold">Profile</h3>
            <div className="flex items-center">
              <div className="relative left-10">
                <EditIcon dark={false} />
              </div>

              <button
                className="bg-white text-black pl-14"
                onClick={handleEdit}
              >
                Edit links
              </button>

            </div>
          </div>

          <div className="flex rounded-xl mt-28 items-center justify-center margin-auto text-black dark:text-white">
            {/* User and links icons */}

            <div className="flex flex-col items-center drop-shadow-lg w-full">
              <h1 className={`${isMobile ? 'text-4xl' : 'text-6xl'} drop-shadow-xl`}>
                {activeUser.name}
              </h1>
              <div className="flex flex-row items-center justify-center py-2">

                <div className="flex items-center mt-10 space-x-4 justify-center bg-gray-100 p-3 pl-6 pr-6 rounded-3xl drop-shadow-xl hover:scale-110 transition-transform shadow-xl dark:bg-gray-200">
                  {/* linkedin */}
                  {input.linkedIn ? (
                    <a href={input.linkedIn} target="_blank">
                      <div className="hover:scale-110 transition-transform">< LinkedInIcon /></div></a>) : (<div className="filter opacity-50">< LinkedInIcon /></div>
                  )}
                  {/* github */}
                  {input.gitHub ? (
                    <a
                      href={input.gitHub}
                      target="_blank"
                      className="dark:text-white"
                    >
                      <div className="hover:scale-110 transition-transform">< GitHubIcon /></div> </a>) : (<div className="filter opacity-50">< GitHubIcon /></div>
                  )}
                  {/* portfolio */}
                  {input.portfolio ? (
                    <a href={input.portfolio} target="_blank">
                      <div className="hover:scale-110 transition-transform">< PortfolioIcon /></div></a>) : (<div className="filter opacity-50">< PortfolioIcon /></div>
                  )}
                </div>
              </div>
            </div>

            {/* los inputs para agregar links */}
            {isEditing && (
              <div className="flex flex-row bg-custom-modalLight shadow-xl drop-shadow-lg p-6 m-2 ml-10 space-x-8 rounded-xl dark:bg-gray-500">
                <div className="flex flex-col space-y-5 items-start">
                  {/* input linkedIn */}
                  <div className="flex flex-row ">
                    <input
                      className={` p-2 rounded-lg  bg-white dark:text-gray-700`}
                      type="text"
                      name="linkedIn"
                      value={input.linkedIn}
                      onChange={handleChange}
                      placeholder="LinkedIn"
                    />
                    <p className="text-red-500 h-1 my-2"></p>
                  </div>

                  {/* input gitHub */}

                  <div className="flex flex-row">
                    <input
                      className={` p-2 rounded-lg dark:text-gray-700 `}
                      type="text"
                      name="gitHub"
                      value={input.gitHub}
                      onChange={handleChange}
                      placeholder="Git Hub"
                    />
                    <p className="text-red-500 h-1 my-2"></p>
                  </div>

                  {/* input portfolio */}

                  <div className="flex flex-row">
                    <input
                      className={` p-2 rounded-lg dark:text-gray-700`}
                      type="text"
                      name="portfolio"
                      value={input.portfolio}
                      onChange={handleChange}
                      placeholder="Portfolio"
                    />
                    <p className="text-red-500 h-1 my-2"></p>
                  </div>
                </div>
                {/* confirm buttons */}
                <div className="flex justify-center items-center ">
                  <button
                    onClick={handleSubmit}
                    className="flex items-center justify-center hover:scale-110 transition-transform bg-red-900"
                  >
                    <TickIcon />
                    <h2 className="ml-2 text-white ">Confirm</h2>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* HEXAGONOS */}


          <div className={`flex justify-between items-center ${isMobile ? 'w-[90%] flex-col' : 'w-[70%]'} margin-auto mt-2`}>

            <div className="flex flex-col justify-between items-center hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  className={`${isMobile ? 'w-20' : 'w-40 '}`}
                  src={hexagon}
                  alt="Descripción de la imagen"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold">
                  {files.filesCopy.length}
                </div>
              </div>
              <div className="flex justify-center">
                <h2 className={`font-bold text-[20px] mt-4 dark:text-white drop-shadow-xl tracking-wide`}>
                  Files
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  className={` ${isMobile ? 'w-20' : 'w-40'}`}
                  src={hexagon}
                  alt="Descripción de la imagen"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold">
                  {applications.EmptyCopyApplications.length}
                </div>
              </div>
              <div className="flex justify-center">
                <h2 className="font-bold text-[20px] mt-4 dark:text-white tracking-wide">
                  Applications
                </h2>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center hover:scale-105 transition-transform">
              <div className="relative">
                <img
                  className={`${isMobile ? 'w-20' : 'w-40'}`}
                  src={hexagon}
                  alt="Descripción de la imagen"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold">
                  {spontaneous.EmptyCopySpontaneous.length}
                </div>
              </div>
              <div className="flex justify-center">
                <h2 className="font-bold text-[20px] mt-4 dark:text-white tracking-wide ">
                  Spontaneous
                </h2>
              </div>
            </div>

          </div>
        </div>

        {isMobile ? <SideBarMobile /> : null}

      </div>
    </div>
  );
}
