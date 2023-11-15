import { useState, ChangeEvent } from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { NewFileIcon } from '../utils/svg'
import axios from 'axios';
import { URL } from "../utils/url";

function Files() {
  const [ modalOpen, setModalOpen]= useState<boolean>(false)
  const handleClick = () => {
    setModalOpen(!modalOpen)
  }
  
  //////////////////////////////
  // LO QUE IRIA EN EL MODAL::
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let chosenFile = null;
    if (e.target.files) {
      chosenFile = e.target.files[0];
      setFile(chosenFile);
    } else console.log("No file found");
  }

  const handleUpload = async () => {
    //Este es un ejemplo de fileData
    const fileData = {
      userId: 1, //reemplazar por el id del activeUser
      name: "myFirstFile", //reemplazar por el name que el usuario quiera poner en el modal
      url: '', //queda como string vacio, el backend la va a llenar despues
      isCv: false //el usuario decide ponerlo en true si quiere, sino va en false
    }
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('data', JSON.stringify(fileData));
      
      const res = await axios.post(`${URL}/file`, formData);
      if (res) return console.log(res);
    }
  };
  // Agregar tambien el input y el button que estan mas abajo
  //////////////////////////////

  return (
    <div className='flex'>
        <SideBar/>
        <div className="w-full h-[100vh]">
            <NavBar/>
        {/* { modalOpen && <CreateSpontaneous close={handleClick}/> } */}
            <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">
              <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] flex justify-between items-center rounded-lg">
                <h3 className="text-white text-2xl font-bold">Files</h3>
    
                <div className="flex items-center">
                  <div className="relative left-10">
                    <NewFileIcon/>
                  </div>
    
                  <button 
                  className="bg-white text-black dark:bg-black dark:text-white pl-14"
                  onClick={handleClick}
                  >
                    Add new file
                  </button>
                </div>
              </div>
    
            </div>
            {/* estos tambien irian en el modal: */}
            <input type="file" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload</button>
        </div>
    </div>
  )
}

export default Files