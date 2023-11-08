import React, { useState } from 'react'
import { AppStore, Spont, inputSpontaneous } from '../models/interfaces';

function Spont({props}:{props: Spont}) {
    console.log(props)
    const [ viewMore, setViewMore ] = useState(false)
    const {company, message, receiver, location, date, feedback} = props
    console.log(viewMore)
  return (
    <div className="flex flex-col my-4 p-5 rounded-xl h-100 w-full shadow-lg" >
    <div className="flex justify-between my-2">
      <h1 className="text-black text-xl">{company}</h1>
      <h2 onClick={()=>{setViewMore(!viewMore)}}className="text-black hover:cursor-pointer hover: text-underline">View more</h2>
    </div>
    <div className="bg-custom-appCardsLight dark:bg-custom-appCardsDark p-2 rounded-lg max-h-auto">
      { viewMore && 
      <div className='flex justify-between'>
        <h2>{location}</h2>
        <h2>{date?.toLocaleString()}</h2>
        <h2>{receiver}</h2>
      </div>
      }
      <h2 className="text-black pt-4">
        " {message}... "
      </h2>
    </div>
  </div>
  )
}

export default Spont