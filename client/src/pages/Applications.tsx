import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import axios from "axios";
import { getApplications } from "../redux/slices/applications.slice";
import { useEffect, useState } from "react";
import { AppStore } from "../models/interfaces";
import { URL } from "../utils/url";
import { useDispatch } from "react-redux";
import CreateApplication from "../modals/CreateApplication";

export default function Applications() {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const activeUser = useSelector((store: AppStore) => store.user);
  const applications = useSelector((store: AppStore) => store.applications)

  const handleClick = () => {
    setModalOpen(!modalOpen)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await axios.get(`${URL}/application//?id=${activeUser.id}`);

        if (data.length) {
          dispatch(getApplications(data)); //lleno el estado global de aplications, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo
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
      {modalOpen && <CreateApplication close={handleClick} />}


      <div className="w-full h-[100vh]">
        <NavBar />

        <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">

          <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg">

            <h3 className="text-white text-2xl font-bold">Application</h3>

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
                className="bg-white text-black dark:bg-black dark:text-white pl-14"
                onClick={handleClick}
              >
                Create new
              </button>
            </div>
          </div>

          <div className="absolute top-40 left-4 flex flex-col max-h-[80%] overflow-y-scroll w-[95%] px-20 pb-5">
            {!applications.EmptyApplications.length ? <h1 className="text-white text-lg">Try adding some applications</h1> : (applications.EmptyApplications.map((app) => {
              if (app.enabled) return (
                <div className="bg-custom-appCardsLight p-5 rounded-xl mt-4 mb-4 shadow-lg dark:bg-custom-appCardsDark w-full flex">
                  <div className="flex flex-col flex-grow">
                    <div className="flex justify-between border-b-2 mb-4">
                      <div className="flex flex-row">
                        <h2>{app.company}</h2>
                      </div>
                      <button > edit </button>
                      <div className="flex flex-row">

                        <h2>{app.status}</h2>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row">
                        <h2> Job: {app.jobName}</h2>
                      </div>
                      <div className="flex flex-row">
                        <h2> Job Type: {app.jobType}</h2>
                      </div>
                      <div className="flex flex-row">
                        <h2>{app.expectedIncome} {app.currency}</h2>
                      </div>
                      {/* <div className="flex flex-row">
                        <h2>{app.feedback}</h2>
                      </div>
                      <div className="flex flex-row">
                        <h2>{app.comments}</h2>
                      </div> */}
                    </div>
                  </div>
                </div>
              );
            }))}
          </div>

        </div>

      </div>
    </div>
  );
}
