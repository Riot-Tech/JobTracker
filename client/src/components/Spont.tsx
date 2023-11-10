import React, { useState } from 'react'
import { AppStore, Spont, inputSpontaneous } from '../models/interfaces';
import { BiWorld } from 'react-icons/bi';
import { MdDateRange } from 'react-icons/md'
import { BsFillPersonFill, BsPersonFillUp, BsTrash } from 'react-icons/bs';

function Spont({props}:{props: Spont}) {
    console.log(props)
    const [ viewMore, setViewMore ] = useState(false)
    const {company, message, receiver, location, date, feedback} = props
    console.log(viewMore)

    const handleDelete = ()=> {

    }

  return (
    <div className="flex flex-col my-4 p-5 rounded-xl h-100 w-full shadow-lg" >
    <div className="relative flex justify-between my-2">
      <h1 className="text-black text-xl">{company}</h1>
      <div className='relative flex justify-between'>
        <h2 onClick={()=>{setViewMore(!viewMore)}}className="text-black hover:cursor-pointer hover: text-underline">{viewMore? 'View less' : 'View more'}</h2>
        <BsTrash onclick={handleDelete} className='absolute bg-red-400 p-1 rounded-[50%] text-4xl left-20 bottom-4 hover:cursor-pointer ' />
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
          <h2 className='p-2'>{date?.toLocaleString()}</h2>
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