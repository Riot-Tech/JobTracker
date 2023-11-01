import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export default function Spontaneous() {

    return (
        <div className="flex">
          <SideBar />
          <div className="w-full h-[100vh]">
            <NavBar />
    
            <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">
              <div className="absolute top-6 left-4 bg-red-700 p-3 w-[95%] flex justify-between items-center rounded-lg">
                <h3 className="text-white text-2xl font-bold">Spontaneous</h3>
    
                <div className="flex items-center">
                  <div className="relative left-10">
                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg" >
                      <path d="M7.94444 26H25.1667C25.6269 26 26 25.6269 26 25.1667V1.83333C26 1.3731 25.6269 1 25.1667 1H1.83333C1.3731 1 1 1.3731 1 1.83333V19.0556" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M10.7222 5.16667H21.8333" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M5.16663 5.16667H6.55551" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M1.69446 25.3056L13.5 13.5M13.5 13.5V19.0556M13.5 13.5H7.94446" stroke="#515151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
    
                  <button className="bg-white text-black dark:bg-black dark:text-white pl-14">
                    Create new
                  </button>
                </div>
              </div>
    
            </div>
    
          </div>
        </div>
      );
}