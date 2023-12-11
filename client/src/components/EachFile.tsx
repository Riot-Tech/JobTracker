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
    <div className={`flex gap-2 items-center w-[80%] h-44 bg-gray-200 drop-shadow-lg shadow-mg rounded-lg mb-5 ${style.file}`}>
      <div className="flex flex-col w-full">
        <h2 className={`font-bold text-gray-700 ${style.fileName}`}>{name}</h2>
        <div className="flex items-center justify-start gap-5 py-2 mt-10">
          <button className={`shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleDownload(name)}>Download</button>
          <button className={`shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleView(name)}>View file</button>
          <BsTrash
            onClick={() => handleDelete(id)}
            className=" text-3xl ml-5 text-gray-600 hover:cursor-pointer hover:text-red-600  dark:hover:text-red-600"
          />
        </div>
      </div>
      <div>
        <img src={cvFileIcon} alt="cvFileIcon"/>
      </div>

    </div>
  ) : (
    <div className={`flex gap-2 items-center w-[80%] h-44 bg-gray-200 drop-shadow-lg shadow-mg rounded-lg mb-5 ${style.file}`}>
      <div className="flex flex-col w-full">
        <h2 className={`font-bold text-gray-700 ${style.fileName}`}>{name}</h2>
        <div className="flex items-center justify-start gap-5 py-2 mt-10">
          <button className={`shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleDownload(name)}>Download</button>
          <button className={`shadow-md bg-white hover:bg-red-900 hover:text-white ${style.buttons}`} onClick={() => handleView(name)}>View file</button>
          <BsTrash
            onClick={() => handleDelete(id)}
            className=" text-3xl ml-5  text-gray-600 hover:cursor-pointer hover:text-red-600  dark:hover:text-red-600"
          />
        </div>
      </div>
      <div>
        <img src={regularFileIcon} alt='fileIcon'/>
      </div>
    </div>
  );
}

export default EachFile;
