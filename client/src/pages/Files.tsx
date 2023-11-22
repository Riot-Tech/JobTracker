import { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { NewFileIcon } from "../utils/svg";
import CreateFile from "../modals/CreateFile";
import axios from "axios";
import { addFile } from "../redux/slices/files.slice";
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";
import { useDispatch } from "react-redux";
import { URL } from "../utils/url";

function Files() {
  const activeUser = useSelector((store: AppStore) => store.user);
  const files = useSelector((store: AppStore) => store.file);
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data } = await axios.get(`${URL}/file/?id=${activeUser.id}`);

        if (data.length) {
          dispatch(addFile(data));
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
        {modalOpen && <CreateFile close={handleClick} />}
        <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">
          <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg">
            <h3 className="text-white text-2xl font-bold">Files</h3>

            <div className="flex items-center">
              <div className="relative left-10">
                <NewFileIcon />
              </div>

              <button
                className="bg-white text-black dark:bg-black dark:text-white pl-14"
                onClick={handleClick}
              >
                Add new file
              </button>
            </div>
          </div>

          <div className="absolute top-28 flex items-start w-full justify-evenly">
            <div className="bg-red-900 px-7 py-2 rounded-xl text-white text-4xl dark:text-black m-2">
                  <h2 className="w-18 text-center">CV files</h2>
            </div>
            <div className="bg-red-900 px-7 py-2 rounded-xl text-white text-4xl dark:text-black m-2">
                  <h2 className="w-18 text-center">Other files</h2>
            </div>
          </div>

          <div className="absolute top-52 left-72 flex w-auto">
            
              <div className="w-1/2 flex flex-col max-h-[80%] overflow-y-scroll px-20 pb-5">
                {files?.map((file) => {
                  if (file.enabled && file.isCv) {
                    return (
                      <div>
                        <h1 className="text-black">{file.name}</h1>
                        <a href={`${file.url}`} target="_blank">
                          <h2>Download</h2>
                        </a>
                      </div>
                    );
                  }
                })}
              </div>
            
              <div className="w-1/2 flex flex-col max-h-[80%] overflow-y-scroll px-20 pb-5">
                {files?.map((file) => {
                  if (file.enabled && !file.isCv) {
                    return (
                      <div>
                        <h1 className="text-black">{file.name}</h1>
                        <a href={`${file.url}`} target="_blank">
                          <h2>Download</h2>
                        </a>
                      </div>
                    );
                  }
                })}
              </div>

            </div>

          </div>

        </div>
            
          
      </div>
  );
}

export default Files;
