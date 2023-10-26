import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useState } from "react";

function Home() {
  
  return (
    <div className="flex">
      
      <div className="w-[12%] h-[100vh] flex flex-col">
        <SideBar />
      </div>

      <div className="w-[88%] h-[100vh]">
        <NavBar/>
        <div className="h-[90%] w-full bg-white dark:bg-gray-400">
          <h1>Sector variable</h1>
        </div>

      </div>

    </div>
  );
}

export default Home;
