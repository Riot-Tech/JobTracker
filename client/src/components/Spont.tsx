import { useState } from 'react'
import { AppStore, Spont } from '../models/interfaces';
import { BiWorld } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md'
import { BsPersonFillUp, BsTrash } from 'react-icons/bs';
import { formattedDate } from '../utils/utilities';
import { EditIcon } from '../utils/svg';
import EditSpontaneous from '../modals/EditSpontaneous';
import axios from 'axios';
import { URL } from '../utils/url';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addSpontaneous } from '../redux/slices/spontaneous.slice';
import style from './Spont.module.css'
import { FaEye, FaEyeSlash } from "react-icons/fa";




function Spont({props}:{props: Spont}) {
    const [ modalOpen, setModalOpen]= useState<boolean>(false)
    const [ viewMore, setViewMore ] = useState(false)
    const activeUser = useSelector((store: AppStore) => store.user);
    const dispatch = useDispatch()

    const {company, message, receiver, location, date, feedback, id, link} = props

    const handleDelete = async ()=> {
      try {
        let response = await axios.patch(`${URL}/spontaneous/${id}`, {company, message, receiver, location, date, feedback, id, link})

        if(response.status === 200){
          let { data } = await axios.get(`${URL}/spontaneous/?id=${activeUser.id}`);
          if (data.length) {
            dispatch(addSpontaneous(data)); //lleno el estado global de spontaneous, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo
            return;
          }
          dispatch(addSpontaneous(data)) //si borro todas las spontaneas mando un arreglo vacio [] para que este sea el arreglo global
        }
      } catch (error) {
        console.log(error)
      }
    }

  return (

    <div className={`flex flex-col my-4 rounded-xl h-100 w-full shadow-lg  border-2 bg-gray-300 dark:bg-gray-400 ${style.spontContainer}`} >
      <div className="relative flex justify-between my-2">
        <h1 className="text-black text-xl font-bold ">{company}</h1>
        <div className='relative flex justify-between'>
          <div className='flex gap-2 items-center right-2'>
            <div className='hover:cursor-pointer' onClick={()=>{setModalOpen(!modalOpen)}} >
              <EditIcon dark={false}/>
            </div>
            { modalOpen && <EditSpontaneous props={props} close={()=>{setModalOpen(!modalOpen)}}/> }
            <div onClick={()=>{setViewMore(!viewMore)}} className="p-1 rounded-[50%] text-2xl hover:cursor-pointer">{viewMore? <FaEyeSlash /> : <FaEye />}</div>
          </div>
          <div>
            <BsTrash onClick={handleDelete} className='p-1 rounded-[50%] text-4xl hover:cursor-pointer text-red-700'/>
          </div>
        </div>  
      </div>
      <div className="bg-white p-2 rounded-lg max-h-auto drop-shadow-md">
        { viewMore && 
        <div className='flex justify-between px-2 border-b-2 border-gray-500'>
          <div className='flex items-center justify-evenly'>
            <BiWorld/>
            <h2 className='p-2'>{location}</h2>
          </div>
          <div className='flex items-center justify-evenly'>
            <MdDateRange />
            <h2 className='p-2'>{date && formattedDate(date)}</h2>
          </div>
          <div className='flex items-center'>
            <BsPersonFillUp/>
            <h2 className='p-2'>{receiver}</h2>
          </div>
        </div>
        }
        <div className='p-2'>
          <h2 className='mx-5 mb-2 font-bold w-16'>Message:</h2>
          <p className={`text-black px-5 ${ viewMore ? '' : 'overflow-hidden'}`}>
            " {message} "
          </p>
        </div>
        {(viewMore && feedback != '') && (
          <div className='p-2'>
            <h2 className='mx-5 mb-2 font-bold w-20'>Feedback:</h2>
            <p className='px-5 text-black'>" {feedback} "</p>
          </div>
        )}
      </div>
  </div>
  )
}

export default Spont