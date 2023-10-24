import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/auth.slice";
import { useNavigate } from "react-router-dom";
import { PublicRoutes } from "../models/routes";
import Logout from "../components/Logout";

function Home() {
  return (
    <div className="flex">
      <div className="bg-slate-200 w-[12%] h-[100vh] flex flex-col">

        <div className="h-[15%] flex flex-col items-center m-10">
          <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.6875 4.64062C16.6875 5.26563 16.5469 5.84375 16.2656 6.375C15.9844 6.90625 15.625 7.39062 15.1875 7.82812C14.75 8.23437 14.25 8.5625 13.6875 8.8125C13.125 9.03125 12.5469 9.14062 11.9531 9.14062C11.3281 9.14062 10.7344 9 10.1719 8.71875C9.64062 8.4375 9.17188 8.07813 8.76562 7.64062C8.35938 7.20312 8.04688 6.70312 7.82812 6.14062C7.60938 5.54688 7.5 4.9375 7.5 4.3125C7.5 3.125 7.92188 2.125 8.76562 1.3125C9.64062 0.5 10.6719 0.09375 11.8594 0.09375C12.4531 0.09375 13.0312 0.21875 13.5938 0.46875C14.1875 0.6875 14.7031 1.01562 15.1406 1.45312C15.6094 1.85937 15.9844 2.34375 16.2656 2.90625C16.5469 3.4375 16.6875 4.01562 16.6875 4.64062ZM17.6719 18.5625C17.6719 21.0625 17.6719 23.5312 17.6719 25.9688C17.6719 28.4062 17.6562 30.875 17.625 33.375C17.625 34.1875 17.6094 35 17.5781 35.8125C17.5469 36.625 17.5312 37.4375 17.5312 38.25C17.5312 38.9688 17.5 39.75 17.4375 40.5938C17.375 41.4375 17.2344 42.25 17.0156 43.0312C16.8281 43.8438 16.5 44.5625 16.0312 45.1875C15.5938 45.8125 14.9688 46.25 14.1562 46.5C13.875 46.5938 13.2812 46.6719 12.375 46.7344C11.4688 46.7969 10.5 46.8438 9.46875 46.875C8.4375 46.9062 7.45312 46.9219 6.51562 46.9219C5.60938 46.9219 5 46.9219 4.6875 46.9219C4.21875 46.9219 3.75 46.9062 3.28125 46.875C2.8125 46.875 2.35938 46.875 1.92188 46.875C1.85938 45.6875 1.73438 44.5469 1.54688 43.4531C1.32812 42.3906 1.125 41.2656 0.9375 40.0781L5.57812 39.6562C6.01562 39.625 6.48438 39.5938 6.98438 39.5625C7.51562 39.5312 8 39.4375 8.4375 39.2812C8.875 39.1562 9.23438 38.9219 9.51562 38.5781C9.79688 38.2656 9.9375 37.7969 9.9375 37.1719C9.9375 35.7344 9.875 34.2969 9.75 32.8594C9.625 31.4219 9.51562 29.9844 9.42188 28.5469C9.26562 26.2031 9.09375 23.8594 8.90625 21.5156C8.71875 19.1719 8.53125 16.7969 8.34375 14.3906C8.6875 14.4219 9.01562 14.4375 9.32812 14.4375C9.64062 14.4375 9.96875 14.4375 10.3125 14.4375C11.5312 14.4375 12.75 14.4062 13.9688 14.3438C15.2188 14.25 16.4531 14.1719 17.6719 14.1094V18.5625ZM45.9844 27.7031L45.1875 35.9531C44.1875 36.0156 43.1875 36.0625 42.1875 36.0938C41.1875 36.1562 40.1875 36.1875 39.1875 36.1875C38.6562 36.1875 37.9531 36.1719 37.0781 36.1406C36.2031 36.1094 35.2969 36.0625 34.3594 36C33.4219 35.9062 32.5312 35.7969 31.6875 35.6719C30.8438 35.5156 30.1719 35.3281 29.6719 35.1094C28.9219 34.7656 28.2969 34.3125 27.7969 33.75C27.3281 33.1875 26.9375 32.5781 26.625 31.9219C26.3125 31.2344 26.0625 30.5156 25.875 29.7656C25.6875 28.9844 25.5469 28.2188 25.4531 27.4688C25.3594 26.75 25.2812 25.9844 25.2188 25.1719C25.1875 24.3281 25.1562 23.4688 25.125 22.5938C25.125 21.7188 25.125 20.875 25.125 20.0625C25.125 19.2188 25.125 18.4375 25.125 17.7188V16.3125H22.2188C22.3438 14.9062 22.4062 13.5156 22.4062 12.1406C22.4375 10.7656 22.5156 9.375 22.6406 7.96875L25.4531 8.0625V1.125C27.2344 1.46875 29 1.65625 30.75 1.6875C32.5312 1.6875 34.3125 1.75 36.0938 1.875L36 9.04688L39.9375 9.28125C39.9375 9.5 39.9375 9.70312 39.9375 9.89062C39.9688 10.0781 39.9844 10.2813 39.9844 10.5C39.9844 11.375 39.9062 12.2344 39.75 13.0781C39.625 13.8906 39.4531 14.7188 39.2344 15.5625H35.8125C35.75 17 35.7031 18.4375 35.6719 19.875C35.6406 21.3125 35.625 22.75 35.625 24.1875C35.625 24.875 35.6406 25.5 35.6719 26.0625C35.7344 26.5938 35.8594 27.0469 36.0469 27.4219C36.2656 27.7969 36.6094 28.0781 37.0781 28.2656C37.5469 28.4531 38.2031 28.5469 39.0469 28.5469C40.2031 28.5469 41.3594 28.4688 42.5156 28.3125C43.6719 28.1562 44.8281 27.9531 45.9844 27.7031Z" fill="#852022"/>
          </svg>
        </div>

        <h2 className="m-2 font-semibold text-gray-500 border-b-2 border-gray-600">MAIN MENU</h2>
        <div className="h-[65%]">

        <div className="flex items-center m-5 hover:bg-slate-400 p-2 rounded-xl">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 11.25H5C2.58 11.25 1.25 9.92 1.25 7.5V5.5C1.25 3.08 2.58 1.75 5 1.75H7C9.42 1.75 10.75 3.08 10.75 5.5V7.5C10.75 9.92 9.42 11.25 7 11.25ZM5 3.25C3.42 3.25 2.75 3.92 2.75 5.5V7.5C2.75 9.08 3.42 9.75 5 9.75H7C8.58 9.75 9.25 9.08 9.25 7.5V5.5C9.25 3.92 8.58 3.25 7 3.25H5Z" fill="#B2B2B2"/>
            <path d="M19 11.25H17C14.58 11.25 13.25 9.92 13.25 7.5V5.5C13.25 3.08 14.58 1.75 17 1.75H19C21.42 1.75 22.75 3.08 22.75 5.5V7.5C22.75 9.92 21.42 11.25 19 11.25ZM17 3.25C15.42 3.25 14.75 3.92 14.75 5.5V7.5C14.75 9.08 15.42 9.75 17 9.75H19C20.58 9.75 21.25 9.08 21.25 7.5V5.5C21.25 3.92 20.58 3.25 19 3.25H17Z" fill="#B2B2B2"/>
            <path d="M19 23.25H17C14.58 23.25 13.25 21.92 13.25 19.5V17.5C13.25 15.08 14.58 13.75 17 13.75H19C21.42 13.75 22.75 15.08 22.75 17.5V19.5C22.75 21.92 21.42 23.25 19 23.25ZM17 15.25C15.42 15.25 14.75 15.92 14.75 17.5V19.5C14.75 21.08 15.42 21.75 17 21.75H19C20.58 21.75 21.25 21.08 21.25 19.5V17.5C21.25 15.92 20.58 15.25 19 15.25H17Z" fill="#B2B2B2"/>
            <path d="M7 23.25H5C2.58 23.25 1.25 21.92 1.25 19.5V17.5C1.25 15.08 2.58 13.75 5 13.75H7C9.42 13.75 10.75 15.08 10.75 17.5V19.5C10.75 21.92 9.42 23.25 7 23.25ZM5 15.25C3.42 15.25 2.75 15.92 2.75 17.5V19.5C2.75 21.08 3.42 21.75 5 21.75H7C8.58 21.75 9.25 21.08 9.25 19.5V17.5C9.25 15.92 8.58 15.25 7 15.25H5Z" fill="#B2B2B2"/>
          </svg>
          <h2 className="ml-2 text-gray-500">Profile</h2>
        </div>

        <div className="flex items-center m-5 hover:bg-slate-400 p-2 rounded-xl">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 23.25H9C3.57 23.25 1.25 20.93 1.25 15.5V9.5C1.25 4.07 3.57 1.75 9 1.75H14C14.41 1.75 14.75 2.09 14.75 2.5C14.75 2.91 14.41 3.25 14 3.25H9C4.39 3.25 2.75 4.89 2.75 9.5V15.5C2.75 20.11 4.39 21.75 9 21.75H15C19.61 21.75 21.25 20.11 21.25 15.5V10.5C21.25 10.09 21.59 9.75 22 9.75C22.41 9.75 22.75 10.09 22.75 10.5V15.5C22.75 20.93 20.43 23.25 15 23.25Z" fill="#B7B7B7"/>
            <path d="M22 11.25H18C14.58 11.25 13.25 9.92 13.25 6.5V2.5C13.25 2.2 13.43 1.92 13.71 1.81C13.99 1.69 14.31 1.76 14.53 1.97L22.53 9.97C22.74 10.18 22.81 10.51 22.69 10.79C22.57 11.07 22.3 11.25 22 11.25ZM14.75 4.31V6.5C14.75 9.08 15.42 9.75 18 9.75H20.19L14.75 4.31Z" fill="#B7B7B7"/>
            <path d="M13 14.25H7C6.59 14.25 6.25 13.91 6.25 13.5C6.25 13.09 6.59 12.75 7 12.75H13C13.41 12.75 13.75 13.09 13.75 13.5C13.75 13.91 13.41 14.25 13 14.25Z" fill="#B7B7B7"/>
            <path d="M11 18.25H7C6.59 18.25 6.25 17.91 6.25 17.5C6.25 17.09 6.59 16.75 7 16.75H11C11.41 16.75 11.75 17.09 11.75 17.5C11.75 17.91 11.41 18.25 11 18.25Z" fill="#B7B7B7"/>
          </svg>
          <h2 className="ml-2 text-gray-500">CV Files</h2>
        </div>

        <div className="flex items-center m-5 hover:bg-slate-400 p-2 rounded-xl">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.27 23.25H4.23C2.22 23.25 1.25 22.32 1.25 20.4V4.6C1.25 2.68 2.23 1.75 4.23 1.75H8.27C10.28 1.75 11.25 2.68 11.25 4.6V20.4C11.25 22.32 10.27 23.25 8.27 23.25ZM4.23 3.25C2.96 3.25 2.75 3.59 2.75 4.6V20.4C2.75 21.41 2.96 21.75 4.23 21.75H8.27C9.54 21.75 9.75 21.41 9.75 20.4V4.6C9.75 3.59 9.54 3.25 8.27 3.25H4.23Z" fill="#852022"/>
<path d="M19.77 14.25H15.73C13.72 14.25 12.75 13.32 12.75 11.4V4.6C12.75 2.68 13.73 1.75 15.73 1.75H19.77C21.78 1.75 22.75 2.68 22.75 4.6V11.4C22.75 13.32 21.77 14.25 19.77 14.25ZM15.73 3.25C14.46 3.25 14.25 3.59 14.25 4.6V11.4C14.25 12.41 14.46 12.75 15.73 12.75H19.77C21.04 12.75 21.25 12.41 21.25 11.4V4.6C21.25 3.59 21.04 3.25 19.77 3.25H15.73Z" fill="#852022"/>
<path d="M19.77 23.25H15.73C13.72 23.25 12.75 22.32 12.75 20.4V18.6C12.75 16.68 13.73 15.75 15.73 15.75H19.77C21.78 15.75 22.75 16.68 22.75 18.6V20.4C22.75 22.32 21.77 23.25 19.77 23.25ZM15.73 17.25C14.46 17.25 14.25 17.59 14.25 18.6V20.4C14.25 21.41 14.46 21.75 15.73 21.75H19.77C21.04 21.75 21.25 21.41 21.25 20.4V18.6C21.25 17.59 21.04 17.25 19.77 17.25H15.73Z" fill="#852022"/>
</svg>
          <h2 className="ml-2 text-gray-500">Application</h2>
        </div>

        <div className="flex items-center m-5 hover:bg-slate-400 p-2 rounded-xl">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 5.75H3C2.59 5.75 2.25 5.41 2.25 5C2.25 4.59 2.59 4.25 3 4.25H21C21.41 4.25 21.75 4.59 21.75 5C21.75 5.41 21.41 5.75 21 5.75Z" fill="#B2B2B2"/>
            <path d="M12.47 10.75H3C2.59 10.75 2.25 10.41 2.25 10C2.25 9.59 2.59 9.25 3 9.25H12.47C12.88 9.25 13.22 9.59 13.22 10C13.22 10.41 12.89 10.75 12.47 10.75Z" fill="#B2B2B2"/>
            <path d="M21 15.75H3C2.59 15.75 2.25 15.41 2.25 15C2.25 14.59 2.59 14.25 3 14.25H21C21.41 14.25 21.75 14.59 21.75 15C21.75 15.41 21.41 15.75 21 15.75Z" fill="#B2B2B2"/>
            <path d="M12.47 20.75H3C2.59 20.75 2.25 20.41 2.25 20C2.25 19.59 2.59 19.25 3 19.25H12.47C12.88 19.25 13.22 19.59 13.22 20C13.22 20.41 12.89 20.75 12.47 20.75Z" fill="#B2B2B2"/>
          </svg>
          <h2 className="ml-2 text-gray-500">Spontaneous</h2>
        </div>
        </div>

        <div className="flex justify-center">
          <Logout />
        </div>
      </div>





      <div className="w-[80%] h-full">

      </div>
      {/* ACA DEBERIA IR UNA SIDE BAR !!!!!!!!!!!!!!!!!!!!!!!! */}
    </div>
  );
}

export default Home;
