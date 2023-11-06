import React, { useEffect, useState, ChangeEvent } from 'react'
import { DateIcon, EditIcon, FeedbackIcon, LinkIcon, LocationIcon, MessageIcon, RecieverIcon, TickIcon } from '../utils/svg'
import { AiOutlineClose } from 'react-icons/ai'
import { validateCreateSpontaneous } from '../utils/validateCreateSpontaneous';
import { AppStore, inputSpontaneous } from '../models/interfaces';
import { hasErrorsSpontaneous } from '../utils/utilities';
import { URL } from '../utils/url';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

type CloseFunction = () => void;

function CreateSpontaneous({ close }: { close: CloseFunction }) {
    const activeUser = useSelector((store: AppStore) => store.user);
    console.log(activeUser.id)
    const dispatch = useDispatch()
    const [ input, setInput ]= useState({
        company:'',
        date:'',
        message:'',
        feedback:'',
        link:'',
        location:'',
        receiver:''
    })
    const [ errors, setErrors]= useState<inputSpontaneous>({
        company:'',
        date:'',
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
                let response = await axios.post(`${URL}/spontaneous`, {...input, userID: activeUser.id})
                if(response.status === 200){
                 //una vez que se guardo en la bdd, modal de confirmacion, se deberia mostrar la espontanea cuando cerramos el modal
                 alert('mande')
                }
             }
        } catch (error) {
            //modal
            console.log(error)
        }
    }

/* console.log(input)
console.log('errors', errors)
console.log(hasErrorsSpontaneous(errors)) */

  return (
    <div className="fixed inset-0 z-20 flex backdrop-brightness-90 flex-col items-center justify-center backdrop-blur-sm">
        <AiOutlineClose onClick={close} className='text-4xl bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600'/>
        <div className='h-[80vh] w-[80vw] bg-custom-modalSpontaneousLight rounded-xl text-black flex flex-col p-10 dark:text-white'>
            <div className='h-[10%] flex justify-between'>
                <div className='flex items-center'>
                    <input type='text' onChange={handleChange} name='company' className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.company.length && 'bg-black border-2 border-red-700 rounded-md'}`} placeholder='Company Name'/>
                </div>
                <button onClick={handleSubmit} className='flex items-center bg-red-500'>
                    <TickIcon/>
                    <h2 className='ml-1 text-white'>Confirm</h2>
                </button>
            </div>
            <div className='h-[60%] flex py-4'>
                <div className='w-[50%] flex flex-col items-start'>
                    <div className='flex items-center my-2'>
                        <DateIcon/>
                        <input onChange={handleChange} name='date' className='ml-2 text-black p-2 rounded-xl' type='date'/>
                    </div>
                    <div className='flex items-center my-2'>
                        <RecieverIcon/>
                        <input onChange={handleChange} name='receiver' className={`ml-2 p-2 bg-transparent border-b-2 border-black ${errors.receiver.length && 'bg-black border-2 border-red-700 rounded-md'}`} placeholder='receiver'/>
                    </div>
                    <div className='flex items-center my-2'>
                        <LinkIcon/>
                        <input type='url' onChange={handleChange} name='link' className={`ml-2 p-2 bg-transparent border-b-2 border-black ${errors.link.length && 'bg-black border-2 border-red-700 rounded-md'}`} placeholder='link'/>
                    </div>
                    <div className='flex my-2'>
                        <LocationIcon/>
                        <select name='location' onChange={handleChange} className='ml-2 rounded-lg'>
                            <option>USA</option>
                            <option>LATAM</option>
                            <option>EUROPE</option>
                            <option>ASIA</option>
                            <option>AFRICA</option>
                        </select>
                    </div>
                    
                </div>
                <div className='w-[50%] flex flex-col'>
                    <div className='flex justify-between m-1'>
                        <div className='flex items-center'>
                            <FeedbackIcon/>
                            <h2 className='ml-1'>Feedback</h2>
                        </div>
                    </div>
                    <textarea onChange={handleChange} name='feedback' className={`w-full h-[80%] p-2 ${errors.feedback.length && 'bg-red-300 border-2 border-red-700 rounded-md'}`}/>
                </div>
            </div>
            <div className='h-[30%] mt-5'>
                <div className='flex justify-between m-2 items-center'>
                    <div className='flex'>
                        <MessageIcon/>
                        <h2 className='ml-5'>Message</h2>
                    </div>
                </div>
                <textarea onChange={handleChange} name='message' className={`w-full h-[70%] p-2 ${errors.message.length && 'bg-red-300 border-2 border-red-700 rounded-md'}`}/>
            </div>
        </div>
    </div>
  )
}

export default CreateSpontaneous