import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

import React, { useEffect, useState, ChangeEvent } from 'react'
import { EditIcon } from '../utils/svg'
import { URL } from '../utils/url';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AppStore } from "../models/interfaces";
import hexagon from "../assets/hexagon.png";


export default function Profile() {

    const user = useSelector((store: AppStore) => store.user)
    const applications = useSelector((store: AppStore) => store.applications)
    const spontaneous = useSelector((store: AppStore) => store.spontaneous)
    // const links = useSelector((store: AppStore) => store.user)
    // Hay que actualizar en Sigup para que pueda importar los links personales al proflie view
    // Esto se va a descontrolaaaaaaar!!
    

    return (
        <div className="flex">
            <SideBar />
            <div className="w-full h-[100vh]">
                <NavBar />
                <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">
                    <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] h-[8%] flex justify-between items-center rounded-lg">
                        <h3 className="text-white text-2xl font-bold">Profile</h3>
                    </div>
                    <div className=' rounded-[42px] flex h-[35%] w-[65%] ml-[17%] mt-[9%] justify-center items-center bg-custom-modalSpontaneousLight shadow-lg'>
                        {/* <div className='flex h-full'>
                            <div className='flex max-w-[100%] justify-center items-center bg-white shadow-lg rounded-full ml-[20%] m-[5%]'>
                                <h1>imagenfff</h1>
                            </div>
                        </div> */}
                        <div className='flex flex-col justify-between w-1/2 px-8 ml-[14%]'>
                            <h1 className="flex items-center">{user.name}<EditIcon /></h1>
                            <div className='flex items-center mt-10 space-x-4'>
                                {/* linkedin */}
                                <a href="https://www.linkedin.com/in/alberto-gentile/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="52" viewBox="0 0 51 52" fill="none">
                                        <path d="M48.4189 15.4991V36.1297C48.4189 43.2509 42.6459 49.0238 35.5247 49.0238H14.8941C7.77291 49.0238 2 43.2509 2 36.1297V15.4991C2 8.37789 7.77291 2.60498 14.8941 2.60498H35.5247C42.6459 2.60498 48.4189 8.37789 48.4189 15.4991Z" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.3153 38.7085V29.6826V20.6567" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M22.6306 38.7085V30.3273M22.6306 30.3273V20.6567M22.6306 30.3273C22.6306 20.6567 38.1036 20.6567 38.1036 30.3273V38.7085" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.3153 12.9461L12.3411 12.9175" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                                {/* github */}
                                <a href="https://www.linkedin.com/in/alberto-gentile/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                        <path d="M25.2094 48.4189C38.0275 48.4189 48.4189 38.0275 48.4189 25.2094C48.4189 12.3912 38.0275 2 25.2094 2C12.3912 2 2 12.3912 2 25.2094C2 38.0275 12.3912 48.4189 25.2094 48.4189Z" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M30.6248 41.4561V37.1322C30.6829 36.4138 30.5833 35.6916 30.3324 35.0136C30.0817 34.3357 29.6855 33.7174 29.1705 33.2C34.029 32.6727 39.135 30.8798 39.135 22.6539C39.1346 20.5503 38.3037 18.5275 36.8141 17.004C37.5194 15.1638 37.4695 13.1296 36.6748 11.3242C36.6748 11.3242 34.8489 10.7969 30.6248 13.554C27.0784 12.6181 23.3403 12.6181 19.7938 13.554C15.5697 10.7969 13.7439 11.3242 13.7439 11.3242C12.9492 13.1296 12.8993 15.1638 13.6046 17.004C12.104 18.5388 11.2721 20.5799 11.2837 22.6989C11.2837 30.8647 16.3898 32.6576 21.2482 33.245C20.7392 33.7573 20.3466 34.3681 20.096 35.038C19.8454 35.7076 19.7425 36.421 19.7938 37.1322V41.4561" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M19.794 38.443C15.1521 39.9092 11.2838 38.443 8.96289 33.9232" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                                {/* instagram */}
                                <a href="https://www.linkedin.com/in/alberto-gentile/" target="_blank">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" viewBox="0 0 51 51" fill="none">
                                        <path d="M25.2095 35.5248C30.9064 35.5248 35.5248 30.9064 35.5248 25.2095C35.5248 19.5125 30.9064 14.8942 25.2095 14.8942C19.5125 14.8942 14.8942 19.5125 14.8942 25.2095C14.8942 30.9064 19.5125 35.5248 25.2095 35.5248Z" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M2 35.5247V14.8941C2 7.77291 7.77291 2 14.8941 2H35.5247C42.6459 2 48.4189 7.77291 48.4189 14.8941V35.5247C48.4189 42.6459 42.6459 48.4189 35.5247 48.4189H14.8941C7.77291 48.4189 2 42.6459 2 35.5247Z" stroke="#4C4C4C" stroke-width="4" />
                                        <path d="M39.3929 11.0517L39.4187 11.0231" stroke="#4C4C4C" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='absolute bottom-9 left-[13%] h-[40%] w-[72%] flex justify-center'>
                        <div className='relative  mt-12 justify-center flex'>
                            <div className='flex justify-center'>

                                <div className="relative w-[15%] mr-[10%]">
                                    <img
                                        src={hexagon}
                                        alt="Descripción de la imagen"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <p className="text-8xl font-bold absolute transform -translate-y-1/2 top-[33%]">5</p>
                                    </div>
                                    <div className='flex justify-center'>
                                        <h1 className='font-bold text-4xl mt-4'>File</h1>
                                    </div>
                                </div>

                                <div className="relative w-[15%] mr-[10%]">
                                    <img
                                        src={hexagon}
                                        alt="Descripción de la imagen"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center z-10">
                                        <p className="text-8xl font-bold absolute transform -translate-y-1/2 top-[33%]">{applications.length}</p>
                                    </div>
                                    <div className='flex justify-center'>
                                        <h1 className='font-bold text-4xl mt-4'>Applications</h1>
                                    </div>
                                </div>
                                
                                <div className="relative w-[15%]">
                                    <img
                                        src={hexagon}
                                        alt="Descripción de la imagen"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 flex justify-center z-10">
                                        <p className="text-8xl font-bold absolute transform -translate-y-1/2 top-[33%]">{spontaneous.length}</p>
                                    </div>
                                    <div className='flex justify-center'>
                                        <h1 className='font-bold text-4xl mt-4'>Spontaneous</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}