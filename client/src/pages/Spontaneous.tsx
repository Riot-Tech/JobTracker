import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useEffect, useState } from 'react'
import CreateSpontaneous from "../modals/CreateSpontaneous";
import { CreateNewIcon } from "../utils/svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../utils/url";
import { AppStore, Spontaneous } from "../models/interfaces";
import { addSpontaneous } from "../redux/slices/spontaneous.slice";
import Spont from "../components/Spont";

export default function Spontaneous() {
    const [ modalOpen, setModalOpen]= useState<boolean>(false)
    const activeUser = useSelector((store: AppStore) => store.user);
    const spontaneous = useSelector((store: AppStore) => store.spontaneous);

    const dispatch = useDispatch()
    
    const handleClick = () => {
      setModalOpen(!modalOpen)
    }
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          let { data } = await axios.get(`${URL}/spontaneous/?id=${activeUser.id}`);

          if (data.length) {
            dispatch(addSpontaneous(data)); //lleno el estado global de spontaneous, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo
            return;
          }
  
          return;
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

    return (
        <div className="flex">
          <SideBar />
          <div className="w-full h-[100vh]">
            <NavBar />
            { modalOpen && <CreateSpontaneous close={handleClick}/> }
            <div className="relative flex flex-col h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark">
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
              <div className="absolute top-36 left-4 flex flex-col max-h-[70%] overflow-y-scroll w-[95%] p-20 pt-0 py-0">
                { spontaneous.EmptyCopySpontaneous.map((spont)=>{
                  if(spont.enabled){
                    return(
                      <Spont key={spont.id} props={spont}/>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </div>
          
  );
}