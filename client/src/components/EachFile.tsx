import { AppStore, File } from "../models/interfaces";
import { BsTrash } from "react-icons/bs";
import { CvFileIcon, OtherFileIcon } from "../utils/svg";
import { URL } from "../utils/url";
import { addFile } from "../redux/slices/files.slice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { LuDownload } from "react-icons/lu";

function EachFile({ props }: { props: File }) {
  const { id, name, url, isCv } = props;
  const activeUser = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch();

  const handleDelete = async (id: number) => {
    try {
      console.log(id);
      let response = await axios.patch(`${URL}/file/${id}`);

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
    <div className="flex justify-between items-center bg-gray-200 p-5 rounded-lg drop-shadow-xl my-4 mx-1">
      <div className="flex gap-5 items-center">
        <h2 className="text-black">{name}</h2>
        <a href={`${url}`} target="_blank">
          <LuDownload className="text-4xl text-black" />
        </a>
      </div>
      <div className="relative">
        <BsTrash
          onClick={() => handleDelete(id)} // Wrap the function in an arrow function
          className="absolute left-32 -top-8 p-1 rounded-[50%] text-4xl  hover:cursor-pointer text-red-700"
        />
        <CvFileIcon />
      </div>
    </div>
  ) : (
    <div className="relative flex justify-between items-center bg-gray-200 p-5 drop-shadow-xl rounded-lg my-4 mx-1">
      <div className="flex gap-5 items-center">
        <h2 className="text-black">{name}</h2>
        <a href={`${url}`} target="_blank">
          <LuDownload className="text-4xl text-black" />
        </a>
      </div>
      <div className="relative">
        <BsTrash
          onClick={() => handleDelete(id)} // Wrap the function in an arrow function
          className="absolute left-32 -top-8 p-1 rounded-[50%] text-4xl  hover:cursor-pointer text-red-700"
        />
        <OtherFileIcon />
      </div>
    </div>
  );  
}

export default EachFile;
