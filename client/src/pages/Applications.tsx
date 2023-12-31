import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useEffect, useState } from "react";
import { AppStore} from "../models/interfaces";
import CreateApplication from "../modals/CreateApplication";
import App from "../components/App";
import SideBarMobile from "../components/SideBarMobile";
import style from './Applications.module.css'


export default function Applications() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const applications = useSelector((store: AppStore) => store.applications)

  const [isMobile, setIsMobile] = useState(false);
  const handleNew = () => {
    setModalOpen(!modalOpen)
  }
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      { !isMobile ? <SideBar /> : null }
      <div className="flex flex-col justify-between h-full w-full">
        <NavBar />
        {modalOpen && <CreateApplication close={handleNew} />}
        <div className="relative h-full w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col overflow-y-auto">

          <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg">

            <h3 className="text-white text-2xl font-bold">Applications</h3>

            <div className="flex items-center">
              <div className="relative left-10">
                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" >
                  <path d="M7.94444 26H25.1667C25.6269 26 26 25.6269 26 25.1667V1.83333C26 1.3731 25.6269 1 25.1667 1H1.83333C1.3731 1 1 1.3731 1 1.83333V19.0556" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M10.7222 5.16667H21.8333" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M5.16663 5.16667H6.55551" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M1.69446 25.3056L13.5 13.5M13.5 13.5V19.0556M13.5 13.5H7.94446" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>

              <button
                className="bg-white text-black pl-14 shadow-xl"
                onClick={handleNew}
              >
                Create new
              </button>
            </div>
          </div>

          <div className={`absolute left-4 flex flex-col max-h-[80%] overflow-y-scroll w-[95%] pb-5 ${style.appsContainer}`}>
            {!applications.EmptyApplications.length ? <h1 className="text-white text-lg">Try adding some applications</h1> : (applications.EmptyApplications.map((app, index) => {
              if (app.enabled) return (
                <App props={app} key={index}/>
              );
            }))}
          </div>

        </div>
        { isMobile ? <SideBarMobile /> : null }
      </div>
    </div>
  );
}
