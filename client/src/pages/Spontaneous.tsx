import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useState, useEffect } from 'react'
import CreateSpontaneous from "../modals/CreateSpontaneous";
import { CreateNewIcon } from "../utils/svg";
import { useSelector } from "react-redux";
import { AppStore, Spontaneous } from "../models/interfaces";
import Spont from "../components/Spont";
import SideBarMobile from "../components/SideBarMobile";
import style from './Spontaneous.module.css'

export default function Spontaneous() {
    const [ modalOpen, setModalOpen]= useState<boolean>(false)
    const spontaneous = useSelector((store: AppStore) => store.spontaneous);
    const [isMobile, setIsMobile] = useState(false);

    const handleClick = () => {
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
            { modalOpen && <CreateSpontaneous close={handleClick}/> }
            <div className="relative flex flex-col h-full w-full bg-custom-backLight dark:bg-custom-backDark overflow-y-auto">
              <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg">
                <h3 className="text-white text-2xl font-bold">Spontaneous</h3>
    
                <div className="flex items-center">
                  <div className="relative left-10">
                    <CreateNewIcon/>
                  </div>
    
                  <button 
                  className="bg-white text-black pl-14"
                  onClick={handleClick}
                  >
                    Create new
                  </button>
                </div>
              </div>
              <div className={`absolute left-4 flex flex-col max-h-[70%] overflow-y-scroll w-[95%] p-20 pt-0 py-0 ${style.spontsContainer}`}>
                { spontaneous.EmptyCopySpontaneous.map((spont)=>{
                  if(spont.enabled){
                    return(
                      <Spont key={spont.id} props={spont}/>
                    )
                  }
                })}
              </div>
            </div>
          { isMobile ? <SideBarMobile /> : null }
          </div>
        </div>
          
  );
}