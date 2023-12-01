import { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { NewFileIcon } from "../utils/svg";
import CreateFile from "../modals/CreateFile";
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";
import EachFile from "../components/EachFile";
import DownloadFileSuccess from "../modals/DownloadFileSuccess";

function Files() {

  const { files } = useSelector((store: AppStore) => store.filesState);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const [downloadModal, setDownloadModal] = useState<boolean>(false);

  const openDownloadModal = () => {
    setDownloadModal(true);

    setTimeout(() => {
      setDownloadModal(false);
    }, 2000);
  };

  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col justify-between h-full w-full">
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
                className="bg-gray-100 text-black shadow-xl  dark:text-black pl-14"
                onClick={handleClick}
              >
                Add new file
              </button>
            </div>
          </div>
          <div className="absolute top-32 flex space-x-[18%] items-start w-full justify-evenly">
            <div className="bg-gray-500 px-8 py-2 rounded-xl shadow-xl text-white text-2xl m-2">
              <h2 className="w-18 text-center font-bold">CV files</h2>
            </div>
            <div className="bg-gray-500 m-2 px-8 py-2 rounded-xl shadow-xl text-white text-2xl dark:">
              <h2 className="w-18 text-center font-bold">Other files</h2>
            </div>
          </div>

          <div className="absolute top-52 flex justify-evenly w-full h-[60vh] p-5">

            <div className="w-1/2 flex flex-col overflow-y-scroll px-20 py-5 mb-5">
              {files?.map((file) => {
                if (file.enabled && file.isCv) {
                  return (
                    <EachFile key={file.id} file={file} openDownloadModal={openDownloadModal} />
                  );
                }
              })}
            </div>

            <div className="w-1/2 flex flex-col overflow-y-scroll px-20 py-5 mb-5">
              {files?.map((file) => {
                if (file.enabled && !file.isCv) {
                  return (
                    <EachFile key={file.id} file={file} openDownloadModal={openDownloadModal} />
                  );
                }
              })}
            </div>
            {/* Modal */}
            {downloadModal && (
                <DownloadFileSuccess/>
            )}
          </div>
        </div>
      </div>
    </div>  
  );
}

export default Files;
