import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { NewFileIcon } from "../utils/svg";
import CreateFile from "../modals/CreateFile";
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";
import EachFile from "../components/EachFile";
import DownloadFileSuccess from "../modals/DownloadFileSuccess";
import SideBarMobile from "../components/SideBarMobile";
import style from './Files.module.css'

function Files() {

  const { files } = useSelector((store: AppStore) => store.filesState);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [downloadModal, setDownloadModal] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  const openDownloadModal = () => {
    setDownloadModal(true);

    setTimeout(() => {
      setDownloadModal(false);
    }, 2000);
  };

  const handleClick = () => {
    setModalOpen(!modalOpen);
  };

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
        {modalOpen && <CreateFile close={handleClick} />}
        <div className="relative h-full w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col overflow-y-auto">
          
          <div className={`absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg ${style.filesBar}`}>
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

          <div className={`absolute top-36 w-full ${style.grayBoxesDiv}`}>
            <div className="flex justify-center w-[15%] ml-32 text-gray-600  drop-shadow-lg dark:text-white">
              <h2 className="text-center text-3xl font-bold border-b-2 border-red-900 p-1">CV files</h2>
            </div>
            <div className="flex justify-center w-[18%] ml-24 text-gray-600 text-3xl drop-shadow-lg dark:text-white">
              <h2 className="text-center font-bold border-b-2 border-red-900 p-1">Other files</h2>
            </div>
          </div>

          <div className={`absolute flex justify-evenly w-[97%] p-5 ${style.filesConteiner}`}>
              <div className={`flex flex-col items-center py-5 mb-5 ${style.file}`}>
                <div className={` text-gray-600  drop-shadow-lg p-2 dark:text-white ${style.cvFilesTitle}`}>
                  <h2 className="text-center text-3xl font-bold border-b-2 border-red-900 p-1">CV files</h2>
                </div>
                {files?.map((file) => {
                  if (file.enabled && file.isCv) {
                    return (
                      <EachFile key={file.id} file={file} openDownloadModal={openDownloadModal} />
                    );
                  }
                })}
              </div>

              <div className={`flex flex-col items-center py-5 mb-5 border-l-4 border-red-900 ${style.file}`}>
                <div className={` text-gray-600  drop-shadow-lg p-2 dark:text-white ${style.cvFilesTitle}`}>
                  <h2 className="text-center text-3xl font-bold border-b-2 border-red-900 p-1">Other Files</h2>
                </div>
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
      { isMobile ? <SideBarMobile /> : null }
      </div>
    </div>  
  );
}

export default Files;
