import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../utils/url";
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";

function Home() {
  return (
    <div className="flex">
      <div className="w-[12%] h-[100vh] flex flex-col">
        <SideBar />
      </div>

      <div className="w-[88%] h-[100vh]">
        <NavBar />
      </div>
    </div>
  );
}

export default Home;
