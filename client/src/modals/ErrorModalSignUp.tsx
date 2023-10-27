function ErrorModalSignUp({ close, error }: { close: (value: boolean) => void, error: string }) {
    return (
      <div className="fixed inset-0 z-20 flex backdrop-brightness-90 flex-col items-center justify-center backdrop-blur-sm">
      <div className=" w-3/12 right-1/2 border-2 border-red-400 top-1/4 max-h-80 bg-white justify-center flex flex-col items-center rounded-xl px-8 py-10 text-gray-800 shadow-lg">
        <svg width="90px" height="90px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f50505">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier"strokeLinecap="round" strokeLinejoin="round"stroke="#a61c1c"strokeWidth="2.88">
            {" "}
            <path
              opacity="0.5"
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              stroke="#d40808"
              strokeWidth="1.5"
            ></path>{" "}
            <path
              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
              stroke="#d40808"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>{" "}
          </g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              opacity="0.5"
              d="M2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12Z"
              stroke="#d40808"
              strokeWidth="0.00024000000000000003"
            ></path>{" "}
            <path
              d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
              stroke="#d40808"
              strokeWidth="0.00024000000000000003"
              strokeLinecap="round"
            ></path>{" "}
          </g>
        </svg>
        <p className="mt-4 text-center text-3xl tracking-wider font-extrabold">
          Sign Up failed
        </p>
        <p className="mt-2 text-center text-xl font-semibold">
          {error}
        </p>
        <div className="mt-8 flex flex-col justify-center space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            onClick={()=>close(false)}
            className="whitespace-nowrap rounded-md  bg-red-500 hover:bg-red-700 px-6 py-3 font-semibold tracking-wide text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
    
  }
  
  export default ErrorModalSignUp