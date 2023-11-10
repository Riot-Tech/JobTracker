import React, { useState } from 'react'
import { AppStore, Spont, inputSpontaneous } from '../models/interfaces';
import { BiWorld } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md'
import { BsFillPersonFill, BsPersonFillUp, BsTrash } from 'react-icons/bs';
import { formattedDate } from '../utils/utilities';
import { EditIcon } from '../utils/svg';
import EditSpontaneous from '../modals/EditSpontaneous';
import axios from 'axios';
import { URL } from '../utils/url';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addSpontaneous } from '../redux/slices/spontaneous.slice';

function Spont({props}:{props: Spont}) {
    const [ modalOpen, setModalOpen]= useState<boolean>(false)
    const [ viewMore, setViewMore ] = useState(false)
    const activeUser = useSelector((store: AppStore) => store.user);
    const dispatch = useDispatch()
    const {company, message, receiver, location, date, feedback, id} = props

    console.log(id)

    const handleDelete = async ()=> {
      try {
        let response = await axios.patch(`${URL}/spontaneous/${id}`)

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

    const handleEdit = ()=> {

    }

  return (
    <div className="flex flex-col my-4 p-5 rounded-xl h-100 w-full shadow-lg" >
    <div className="relative flex justify-between my-2">
      <h1 className="text-black text-xl">{company}</h1>
      <div className='relative flex justify-between'>
        <div className='flex gap-2 items-center right-2'>
          <div className='hover:cursor-pointer' onClick={()=>{setModalOpen(!modalOpen)}} >
            <EditIcon/>
          </div>
          { modalOpen && <EditSpontaneous /*   */ close={()=>{setModalOpen(!modalOpen)}}/> }
          <h2 onClick={()=>{setViewMore(!viewMore)}}className="text-black hover:cursor-pointer hover: text-underline">{viewMore? 'View less' : 'View more'}</h2>
        </div>
        <div>
          <BsTrash onClick={handleDelete} className='absolute bg-red-400 p-1 rounded-[50%] text-4xl left-28 bottom-4 hover:cursor-pointer ' />
        </div>
      </div>  
    </div>
    <div className="bg-red-100 dark:bg-custom-appCardsDark p-2 rounded-lg max-h-auto">
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
      <p className={`text-black pt-4 px-5 ${ viewMore ? '' : 'overflow-hidden'}`}>
        " {message} "
      </p>
    </div>
  </div>
  )
}

export default Spont