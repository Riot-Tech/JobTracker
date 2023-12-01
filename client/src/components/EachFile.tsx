import { AppStore, EachFileProps, File } from "../models/interfaces";
import { BsTrash } from "react-icons/bs";
import { CvFileIcon, OtherFileIcon } from "../utils/svg";
import { URL } from "../utils/url";
import { addFile } from "../redux/slices/files.slice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useState } from "react";
// import { LuDownload } from "react-icons/lu";

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
    <div className=" flex justify-between items-center bg-gray-200 p-5 drop-shadow-lg shadow-mg rounded-lg my-4 mx-7">
      <div className="flex flex-col gap-5 ml-5">
        <h2 className="text-black text-xl">{name}</h2>
        {/* <LuDownload onClick={() => handleView(name)} className="text-4xl text-black hover:cursor-pointer" /> */}
        <div className="space-x-6 mt-5">
          <button className=" shadow-md border-none bg-white hover:bg-red-900 hover:text-white" onClick={() => handleDownload(name)}>Download</button>
          <button className="shadow-md border-none bg-white hover:bg-red-900 hover:text-white" onClick={() => handleView(name)}>View file</button>
        </div>
      </div>
      <div className="relative">
        <BsTrash
          onClick={() => handleDelete(id)} // Wrap the function in an arrow function
          className="absolute left-44 top-14 p-1 rounded-[50%] text-4xl  hover:cursor-pointer text-red-900 dark:text-white"
        />
        <CvFileIcon />
      </div>
    </div>
  ) : (
    <div className=" flex justify-between items-center bg-gray-200 p-5 drop-shadow-lg shadow-mg rounded-lg my-4 mx-7 ">
      <div className="flex flex-col gap-5 ml-5">
        <h2 className="text-black text-xl">{name}</h2>
        {/* <LuDownload onClick={() => handleView(name)} className="text-4xl text-black hover:cursor-pointer" /> */}
        {/* <button onClick={() => handleDownload(name)}>Download</button>
        <button onClick={() => handleView(name)}>View file</button> */}
        <div className="space-x-6 mt-5">
          <button className=" shadow-md border-none bg-white hover:bg-red-900 hover:text-white" onClick={() => handleDownload(name)}>Download</button>
          <button className="shadow-md border-none bg-white hover:bg-red-900 hover:text-white" onClick={() => handleView(name)}>View file</button>
        </div>
      </div>
      <div className="relative">
        <BsTrash
          onClick={() => handleDelete(id)} // Wrap the function in an arrow function
          className="absolute left-48 top-14 p-1 rounded-[50%] text-4xl  hover:cursor-pointer text-red-900 hover:text-red-600 dark:text-white "
        />
        <OtherFileIcon />
      </div>
    </div>
  );
}

export default EachFile;
