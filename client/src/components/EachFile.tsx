import { AppStore, EachFileProps } from "../models/interfaces";
import { BsTrash } from "react-icons/bs";
import { URL } from "../utils/url";
import { addFile } from "../redux/slices/files.slice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import cvFileIcon from '../assets/light-icon-page-star.png'
import regularFileIcon from '../assets/light-icon-multiple-pages.png'
import style from './EachFile.module.css'

function EachFile({ file, openDownloadModal }: EachFileProps) {

  const { id, name, isCv } = file;

  const activeUser = useSelector((store: AppStore) => store.user);

  const dispatch = useDispatch();


  const handleDownload = async (filename: string) => {
    const res = await axios(`${URL}/file/download/${activeUser.id}?filename=${filename}`);

    if (res) {
      openDownloadModal();
    }
  };


  const handleView = async (filename: string) => {
    try {
      const { data } = await axios(`${URL}/file/view/${activeUser.id}?filename=${filename}`);

      if (!data || typeof (data) !== 'string') {
        return console.log('Invalid signed URL received from server');
      };
      return window.open(data, '_blank');

    } catch (error) {
      console.error(error);
    };
  };


  const handleDelete = async (id: number) => {
    try {
      let response = await axios.delete(`${URL}/file/${id}`);

      if (response.status === 200) {
        let { data } = await axios.get(`${URL}/file/?id=${activeUser.id}`);
        if (data.length) {
          dispatch(addFile(data));
          return;
        }
        dispatch(addFile(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isCv ? (
    <div className={`flex justify-between items-center w-[90%] bg-gray-200 drop-shadow-lg shadow-mg rounded-lg ${style.file}`}>
      <div className="flex flex-col">
        <h2 className={`text-black ${style.fileName}`}>{name}</h2>
        {/* <LuDownload onClick={() => handleView(name)} className="text-4xl text-black hover:cursor-pointer" /> */}
        <div className="flex items-center justify-between gap-5 py-2">
          <button className={`text-md shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleDownload(name)}>Download</button>
          <button className={`text-md shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleView(name)}>View file</button>
        </div>
      </div>
      <div className="relative flex justify-end items-center m-1">
          <img src={cvFileIcon} alt="cvFileIcon" />
          <BsTrash
            onClick={() => handleDelete(id)}
            className="absolute left-[130%] rounded-[50%] text-4xl  hover:cursor-pointer text-red-900 dark:text-white"
          />
      </div>
    </div>
  ) : (
    <div className={`flex justify-between items-center w-[90%] bg-gray-200 drop-shadow-lg shadow-mg rounded-lg ${style.file}`}>
      <div className="flex flex-col">
        <h2 className={`text-black ${style.fileName}`}>{name}</h2>
        <div className="flex items-center justify-between gap-5 py-2">
          <button className={`text-md shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleDownload(name)}>Download</button>
          <button className={`text-md shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleView(name)}>View file</button>
        </div>
      </div>
      <div className="relative flex justify-end items-center m-1">
        <img src={regularFileIcon} alt='fileIcon'/>
        <BsTrash
          onClick={() => handleDelete(id)} // Wrap the function in an arrow function
          className="absolute left-[130%] rounded-[50%] text-4xl  hover:cursor-pointer text-red-900 dark:text-white"
        />
      </div>
    </div>
  );
}

export default EachFile;
