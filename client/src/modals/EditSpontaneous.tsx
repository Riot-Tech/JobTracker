import { useState, ChangeEvent } from 'react'
import { FeedbackIcon, LinkIcon, LocationIcon, MessageIcon, RecieverIcon, TickIcon } from '../utils/svg'
import { AiOutlineClose } from 'react-icons/ai'
import { validateCreateSpontaneous } from '../utils/validateCreateSpontaneous';
import { AppStore, Spont } from '../models/interfaces';
import { hasErrorsSpontaneous } from '../utils/utilities';
import { URL } from '../utils/url';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addSpontaneous } from '../redux/slices/spontaneous.slice';
import { IoAlertCircle } from 'react-icons/io5';

type CloseFunction = () => void;

function EditSpontaneous({ close,  props }: { close: CloseFunction, props: Spont }) {
    const activeUser = useSelector((store: AppStore) => store.user);
    const [ confirmed, setConfirmed ]= useState(false)
    
    const dispatch = useDispatch()
    
    //SOLICITO LA INFO DE LA ESPONTEA O LA PASO POR PROPS DESDE SPONT, Y RELLENO LOS INPUT CON ESOS VALORES
    const {company, message, receiver, location, feedback, id, link} = props
    
    const [ input, setInput ]= useState({
        company: company || '',
        message: message ||'',
        feedback: feedback ||'',
        link: link ||'',
        location: location ||'',
        receiver: receiver ||''
    })

    const [ errors, setErrors]= useState({
        company:'',
        message:'',
        feedback:'',
        link:'',
        location:'',
        receiver:''
    })

    const handleChange = (event: ChangeEvent<HTMLInputElement>| ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>)=>{
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

    const handleSubmit = async ()=>{
        try {
            if(!hasErrorsSpontaneous(errors)){
                let response = await axios.patch(`${URL}/spontaneous`, {...input, id: id, userId: activeUser.id})
                if(response.status === 200){
                    
                 //una vez que se guardo en la bdd, modal de confirmacion, se deberia mostrar la espontanea cuando cerramos el modal
                    let { data } = await axios.get(`${URL}/spontaneous/?id=${activeUser.id}`);
                    if (data.length) {
                      setConfirmed(true)
                      dispatch(addSpontaneous(data)); //lleno el estado global de spontaneous, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo
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
        <AiOutlineClose onClick={close} className='text-4xl text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600'/>
        <div className='h-[80vh] w-[80vw] bg-custom-modalSpontaneousLight rounded-xl text-black flex flex-col p-10 dark:text-white'>
            <div className='h-[10%] flex justify-between'>
                <div className='flex items-center'>
                    <input type='text' onChange={handleChange} value={input.company} name='company' className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.company.length && 'bg-black border-2 border-red-700 rounded-md'}`} placeholder='Company Name'/>
                </div>
                <button onClick={handleSubmit} className={`flex items-center ${confirmed ? 'bg-green-400 ring ring-green-400' : 'bg-red-500'}`}>
                    <TickIcon/>
                    <h2 className='ml-1 text-white'>Confirm</h2>
                </button>
            </div>
            <div className='h-[60%] flex py-4'>
                <div className='w-[50%] flex flex-col items-start'>
                    {/* <div className='flex items-center my-2'>
                        <DateIcon/>
                        <input onChange={handleChange} name='date' className='ml-2 text-black p-2 rounded-xl' type='date'/>
                    </div> */}
                    <div className='flex items-center my-2'>
                        <RecieverIcon/>
                        <input value={input.receiver} onChange={handleChange} name='receiver' className={`ml-2 p-2 bg-transparent border-b-2 border-black ${errors.receiver.length && 'bg-black border-2 border-red-700 rounded-md'}`} placeholder='receiver'/>
                    </div>
                    <div className='flex items-center my-2'>
                        <LinkIcon/>
                        <input value={input.link} name='link' type='url' onChange={handleChange} className={`ml-2 p-2 bg-transparent border-b-2 border-black ${errors.link.length && 'bg-black border-2 border-red-700 rounded-md'}`} placeholder='link'/>
                    </div>
                    <div className='flex my-2 items-center'>
                        <LocationIcon/>
                        <select name='location' value={input.location} onChange={handleChange} className='ml-2 rounded-lg p-3'>
                            <option>USA</option>
                            <option>LATAM</option>
                            <option>EUROPE</option>
                            <option>ASIA</option>
                            <option>AFRICA</option>
                        </select>
                        { errors.location && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' /> }
                    </div>
                    
                </div>
                <div className='w-[50%] flex flex-col'>
                    <div className='flex justify-between m-1'>
                        <div className='flex items-center'>
                            <FeedbackIcon/>
                            <h2 className='ml-1'>Feedback</h2>
                        </div>
                    </div>
                    <textarea value={input.feedback} onChange={handleChange} name='feedback' className={`w-full h-[80%] p-2 ${errors.feedback.length && 'bg-red-300 border-2 border-red-700 rounded-md'}`}/>
                </div>
            </div>
            <div className='h-[30%] mt-5'>
                <div className='flex justify-between m-2 items-center'>
                    <div className='flex'>
                        <MessageIcon/>
                        <h2 className='ml-5'>Message</h2>
                    </div>
                </div>
                <textarea value={input.message} onChange={handleChange} name='message' className={`w-full h-[70%] p-2 ${errors.message.length && 'bg-red-300 border-2 border-red-700 rounded-md'}`}/>
            </div>
        </div>
    </div>
  )
}

export default EditSpontaneous