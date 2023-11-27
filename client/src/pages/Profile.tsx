import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import { useDispatch, useSelector } from 'react-redux';
import { AppStore } from "../models/interfaces";
import hexagon from "../assets/hexagon.png";
// import { Link } from "react-router-dom";
import { URL } from "../utils/url";

// import { EditIcon } from '../utils/svg';

// import { validateSignUpForm } from "../utils/validateSignUpForm";
import { useState, ChangeEvent, useEffect } from "react";
// import { hasErrors } from "../utils/utilities";
import axios from "axios";
import { updateUser } from "../redux/slices/auth.slice";
import { EditIcon, LinkedInIcon, TickIcon, GitHubIcon, PortfolioIcon } from '../utils/svg';
import { validateLink } from '../utils/validateProfileLinks';


export default function Profile() {

    const dispatch = useDispatch()

    const activeUser = useSelector((store: AppStore) => store.user);
    const applications = useSelector((store: AppStore) => store.applications);
    const spontaneous = useSelector((store: AppStore) => store.spontaneous);
    const files = useSelector((store: AppStore) => store.filesState);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let { data } = await axios.get(`${URL}/user/${activeUser.id}`);
                console.log(data)
                console.log(data.id)
                return;
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);


    const [input, setInput] = useState({
        id: activeUser.id,
        name: activeUser.name ,
        email:activeUser.email,
        password: '',
        linkedIn: activeUser.linkedIn || '',
        gitHub: activeUser.gitHub || '',
        portfolio: activeUser.portfolio || '',
        profilePicture: null,
        enabled: true,
        token: activeUser.token
    })

    // const [errors, setErrors] = useState({ name: "", email: "", password: "", linkedIn: "", gitHub: "", portfolio: "" })

    const [edition, setEdition] = useState(false);


    console.log('activeUser', activeUser)

    console.log(input)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {

        const newLink = event.target.value;
        console.log(newLink)
        if (validateLink(newLink) === true) {
            console.log('entre')
            setInput({
                ...input,
                [event.target.name]: event.target.value,
            });
            console.log(input)
        } else {
            console.log('Invalid link')
        }
    };


    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const { token, ...user } = activeUser;

        try {
            const res = await axios.patch(`${URL}/user/`, user);
            if (res.status === 200) {
                dispatch(updateUser(input));

                setEdition(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = () => {
        setEdition(true);
    };

    // falta mostrar el boton para cerrar el panel de links
    // const handleClose = () => {
    //     setEdition(false)
    // }


    return (
        <div className="flex">
            <SideBar />
            <div className="w-full h-[100vh]">
                <NavBar />
                <div className="relative h-[90%] w-full bg-custom-backLight dark:bg-custom-backDark flex flex-col">
                    <div className="absolute top-6 left-4 bg-red-900 p-3 w-[95%] h-[8%] flex justify-between items-center rounded-lg">
                        <h3 className="text-white text-2xl font-bold">Profile</h3>
                    </div>
                    <div className=' rounded-[42px] flex h-[35%] w-[60%] ml-[17%] mt-[9%] items-center space-x-8 shadow-lg  bg-custom-modalLight text-black dark:text-white dark:bg-custom-modalDark drop-shadow-lg'>

                        {/* User and links icos */}

                        <div className='flex flex-col  justify-between w-1/2 px-8 drop-shadow-lg'>
                            <h1 className="flex items-center justify-center">{activeUser.name}</h1>
                            <div className="flex flex-row items-center justify-center">
                                <div className='flex items-center mt-10 space-x-4 justify-center'>
                                    {/* linkedin */}
                                    
                                        <a href={activeUser.linkedIn} target="_blank" >
                                            <LinkedInIcon />
                                        </a>
                                    
                                    {/* github */}
                                    
                                        <a href={activeUser.gitHub} target="_blank">
                                            <GitHubIcon />
                                        </a>
                                 
                                    {/* portfolio */}
                                    
                                        <a href={activeUser.portfolio} target="_blank" >
                                            <PortfolioIcon />
                                        </a>
                                   

                                </div>
                                <div className='absolute ml-80 items-center justify-center'>
                                    {/* edit button */}
                                    {edition === false && (
                                        <button onClick={handleEdit} className='flex items-center justify-center bg-transparent mt-10 hover:scale-110 transition-transform border-none'>
                                            <h2><EditIcon /></h2>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* los inputs para agregar links */}
                        {edition === true && (
                            <div className="flex w-[38%] bg-gray-200 shadow-xl drop-shadow-lg p-6 rounded-xl">
                                <div className="flex flex-col space-y-5 items-start">
                                    {/* input linkedIn */}
                                    {edition === true && (
                                        <div className="flex flex-row">
                                            <input
                                                className={` p-2 rounded-lg  bg-white dark:text-white`}
                                                type="text"
                                                name="linkedIn"
                                                value={activeUser.linkedIn}
                                                onChange={handleChange}
                                                placeholder="LinkedIn"
                                            />
                                            <p className="text-red-500 h-1 my-2"></p>
                                        </div>
                                    )}
                                    {/* input gitHub */}
                                    {edition === true && (
                                        <div className="flex flex-row">
                                            <input
                                                className={` p-2 rounded-lg bg-white `}
                                                type="text"
                                                name="gitHub"
                                                value={activeUser.gitHub}
                                                onChange={handleChange}
                                                placeholder="Git Hub"
                                            />
                                            <p className="text-red-500 h-1 my-2"></p>
                                        </div>
                                    )}
                                    {/* input portfolio */}
                                    {edition === true && (
                                        <div className="flex flex-row">
                                            <input
                                                className={` p-2 rounded-lg bg-white`}
                                                type="text"
                                                name="portfolio"
                                                value={activeUser.portfolio}
                                                onChange={handleChange}
                                                placeholder="Portfolio"
                                            />
                                            <p className="text-red-500 h-1 my-2"></p>
                                        </div>
                                    )}
                                </div>
                                {/* confirm buttons */}
                                <div className='flex justify-center items-center ml-5'>
                                    {edition === true && (
                                        <button onClick={handleSubmit} className='flex items-center justify-center  bg-red-900'>
                                            <TickIcon />
                                            <h2 className='ml-2 text-white '>Confirm</h2>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                {/* stats */}
                <div className='absolute bottom-9 left-[13%] h-[40%] w-[72%] flex justify-center items-center'>
                    <div className='relative  mt-12 justify-center flex'>
                        <div className='flex justify-center'>

                            <div className="relative w-[15%] mr-[10%]">
                                <img
                                    src={hexagon}
                                    alt="Descripción de la imagen"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <p className="text-8xl font-bold absolute transform -translate-y-1/2 top-[36%]">{files.filesCopy.length}</p>
                                </div>
                                <div className='flex justify-center'>
                                    <h1 className='font-bold text-4xl mt-4 dark:text-white'>Files</h1>
                                </div>
                            </div>

                            <div className="relative w-[15%] mr-[10%]">
                                <img
                                    src={hexagon}
                                    alt="Descripción de la imagen"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <p className="text-8xl font-bold absolute transform -translate-y-1/2 top-[36%]">{applications.EmptyCopyApplications.length}</p>
                                </div>
                                <div className='flex justify-center'>
                                    <h1 className='font-bold text-4xl mt-4 dark:text-white'>Applications</h1>
                                </div>
                            </div>

                            <div className="relative w-[15%]">
                                <img
                                    src={hexagon}
                                    alt="Descripción de la imagen"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 flex justify-center z-10">
                                    <p className="text-8xl font-bold absolute transform -translate-y-1/2 top-[36%]">{spontaneous.EmptyCopySpontaneous.length}</p>
                                </div>
                                <div className='flex justify-center'>
                                    <h1 className='font-bold text-4xl mt-4 dark:text-white'>Spontaneous</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
