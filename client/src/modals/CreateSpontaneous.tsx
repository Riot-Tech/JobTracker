import { useEffect, useState } from 'react'
import { DateIcon, EditIcon, FeedbackIcon, LinkIcon, LocationIcon, MessageIcon, TickIcon } from '../utils/svg'

function CreateSpontaneous() {
  return (
    <div className="fixed inset-0 z-20 flex backdrop-brightness-90 flex-col items-center justify-center backdrop-blur-sm">
        <div className='h-[80vh] w-[80vw] bg-black flex flex-col p-10'>
            <div className='h-[10%] flex justify-between'>
                <div className='flex items-center'>
                    <h2 className='mr-1'>Company Name</h2>
                    <EditIcon/>
                </div>
                <button className='flex items-center bg-red-500'>
                    <TickIcon/>
                    <h2 className='ml-1'>Confirm</h2>
                </button>
            </div>
            <div className='h-[60%] flex py-4'>
                <div className='w-[50%] flex flex-col items-start'>
                    <div className='flex items-center'>
                        <DateIcon/>
                    </div>
                    <div className='flex items-center'>
                        <LinkIcon/>
                        <input placeholder='receiver'/>
                    </div>
                    <div className='flex m-2'>
                        <LocationIcon/>
                        <select>
                            <option>USA</option>
                            <option>LATAM</option>
                            <option>EUROPE</option>
                            <option>ASIA</option>
                            <option>AFRICA</option>
                        </select>
                    </div>
                    <div className='flex'>
                        <LinkIcon/>
                        <input placeholder='link'/>
                    </div>
                    
                </div>
                <div className='w-[50%] flex flex-col'>
                    <div className='flex justify-between m-1'>
                        <div className='flex items-center'>
                            <FeedbackIcon/>
                            <h2 className='ml-1'>Feedback</h2>
                        </div>
                        <EditIcon/>
                    </div>
                    <textarea className='w-full'/>
                </div>
            </div>
            <div className='h-[30%]'>
                <div className='flex justify-between m-2 items-center'>
                    <div className='flex'>
                        <MessageIcon/>
                        <h2 className='ml-5'>Message</h2>
                    </div>
                    <EditIcon/>
                </div>
                <textarea className='w-full'/>
            </div>
        </div>
    </div>
  )
}

export default CreateSpontaneous