import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'
import { NewFileIcon } from '../utils/svg'

function Files() {
    const [ modalOpen, setModalOpen]= useState<boolean>(false)
    
    const handleClick = () => {
      setModalOpen(!modalOpen)
    }
  return (
    <div className='flex'>
        <SideBar/>
        <div className="w-full h-[100vh]">
            <NavBar/>
        {/* { modalOpen && <CreateSpontaneous close={handleClick}/> } */}
            <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">
              <div className="absolute top-6 left-4 bg-red-700 p-3 w-[95%] flex justify-between items-center rounded-lg">
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
        </div>
    </div>
  )
}

export default Files