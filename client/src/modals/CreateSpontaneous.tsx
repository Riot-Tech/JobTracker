import { useState, ChangeEvent } from 'react'
import { RecieverIcon, TickIcon } from '../utils/svg'
import { AiOutlineClose } from 'react-icons/ai'
import { IoAlertCircle } from "react-icons/io5";
import { validateCreateSpontaneous } from '../utils/validateCreateSpontaneous';
import { AppStore } from '../models/interfaces';
import { hasErrorsSpontaneous, isInputEmpty } from '../utils/utilities';
import { URL } from '../utils/url';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addSpontaneous } from '../redux/slices/spontaneous.slice';
import { RiArrowGoBackFill } from 'react-icons/ri';
import style from './CreateSpont.module.css';
import { FaLink, FaLocationDot } from 'react-icons/fa6';
import { MdContactMail, MdOutlineMessage } from "react-icons/md";


type CloseFunction = () => void;

function CreateSpontaneous({ close }: { close: CloseFunction }) {

    const activeUser = useSelector((store: AppStore) => store.user);
    const [confirmed, setConfirmed] = useState(false)

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        company: '',
        message: '',
        feedback: '',
        link: '',
        location: '',
        receiver: ''
    })

    const [errors, setErrors] = useState({
        company: '',
        message: '',
        feedback: '',
        link: '',
        location: '',
        receiver: ''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validateCreateSpontaneous(
            {
                ...input,
                [event.target.name]: event.target.value
            }
        ))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(input)
        try {
            if (!hasErrorsSpontaneous(errors) && !isInputEmpty(input)) {
                let response = await axios.post(`${URL}/spontaneous`, { ...input, userId: activeUser.id })

                if (response.status === 200) { //una vez que se guardo en la bdd, modal de confirmacion, se deberia mostrar la espontanea cuando cerramos el modal
                    
                    let { data } = await axios.get(`${URL}/spontaneous/?id=${activeUser.id}`);
                    if (data.length) {
                        setConfirmed(true);
                        dispatch(addSpontaneous(data)); //lleno el estado global de spontaneous, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo

                        // Agrega un retraso de 1000 milisegundos (1 segundo)
                        await new Promise((resolve) => setTimeout(resolve, 1000));

                        // Después del retraso, cierra el modal
                        close();
                        return;
                    }

                    return;

                }
            }
        } catch (error) {
            //modal
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 z-20 flex backdrop-brightness-90 flex-col items-center justify-center backdrop-blur-sm">
            <AiOutlineClose onClick={close} className='text-4xl text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-400' />

            <div className={`flex flex-col h-[80%] w-[80%] rounded-xl text-black bg-custom-modalLight dark:text-white dark:bg-custom-modalDark overflow-y-auto ${style.modal}`}>

                <div className={`flex h-full md:h-1/2 ${style.modal}`}>

                    <div className={`flex flex-col pl-10 pr-10 pt-10 md:pl-10 md:pt-10 md:w-full ${style.modal}`}>

                        <div className='bg-red divide-black drop-shadow-lg'>
                            <div className='flex items-center pb-5'>
                                <input
                                    type='text'
                                    onChange={handleChange}
                                    name='company'
                                    className={`w-full md:w-[80%] mr-1 p-1 bg-transparent text-3xl border-b-2 border-black ${errors.company.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                    placeholder='Company Name' />
                            </div>
                        </div>

                        <div className={`w-full flex py-4 ${style.modal}`}>
                            <div className='flex flex-col items-start'>
                                <div className='flex items-center my-3'>
                                    <MdContactMail className='text-black text-4xl'/>
                                    <input
                                        onChange={handleChange}
                                        name='receiver'
                                        className={`w-full md:w-full ml-6 p-2 bg-transparent border-b-2 border-black ${errors.receiver.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                        placeholder='receiver'
                                    />
                                </div>
                                <div className='flex items-center my-3'>
                                    <FaLink className='text-black text-4xl' />
                                    <input
                                        type='url'
                                        onChange={handleChange}
                                        name='link'
                                        className={`w-full md:w-full ml-6 p-2 bg-transparent border-b-2 border-black ${errors.link.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                        placeholder='link'
                                    />
                                </div>
                                <div className='flex my-5 items-center text-black'>
                                    <FaLocationDot className='text-black text-4xl' />
                                    <select
                                        name='location'
                                        onChange={handleChange}
                                        className='w-full md:w-full ml-6 rounded-lg p-3'>
                                        <option>USA</option>
                                        <option>LATAM</option>
                                        <option>EUROPE</option>
                                        <option>ASIA</option>
                                        <option>AFRICA</option>
                                    </select>
                                    {errors.location && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={`md:w-full flex flex-col pr-8 pl-8 md:pt-10 md:pr-10 h-full drop-shadow-lg ${style.modal}`}>
                        <div className={`flex justify-center md:justify-end order-last md:order-first ${style.buttonConfirm}`}>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className={`flex items-center ${confirmed ? 'bg-green-400 ring ring-green-400' : 'bg-red-500 hover:scale-110 transition-transform'}`}
                            >
                                {<TickIcon />}
                                <h2 className='ml-1 text-white'>Confirm</h2>
                            </button>
                        </div>

                        <div className={`flex flex-col mt-2 h-full ${style.inputContainer}`}>
                            <div className='flex items-center'>
                                <RiArrowGoBackFill className='text-black text-2xl' />
                                <h2 className='ml-4 text-xl'>Feedback</h2>
                            </div>
                            <textarea
                                name="feedback"
                                className="h-full text-black p-2 mt-3 rounded-lg"
                                onChange={handleChange}
                                placeholder="Any feedback from the company (e.g., interview experience, comments, or follow-up notes)"
                            />
                        </div>
                    </div>
                </div>

                <div className={`flex md:h-[50%] w-full pr-8 pl-8 pb-8 md:pt-10 md:pr-10 md:pb-10 ${style.messageContainer}`}>
                    <div className={`flex flex-col mt-5 p-1 w-full ${style.inputContainer}`}>
                        <div className='flex'>
                            <MdOutlineMessage className='text-black text-3xl' />
                            <h2 className='ml-4 text-xl'>Message</h2>
                        </div>

                        <textarea
                            name="message"
                            className="h-full text-black p-2 mt-3 rounded-lg"
                            onChange={handleChange}
                            placeholder="Feel free to write any comments you'd like here."
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSpontaneous