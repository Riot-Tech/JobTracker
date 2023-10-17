import React from 'react'
import confirmation from '../assets/Icon Confirmation.gif'
function SignUpSuccess() {
  return (
    <div className='absolute top-[-20%] left-[130%] h-[100px] w-[300px]'>
        <div className='flex'>
            <div className='flex justify-center items-center bg-white w-[60%] p-5 text-lg font-bold'>
                User created!
            </div>
            <div className='w-[50%]'>
                <img src={confirmation} className='' />
            </div>
        </div>
    </div>
  )
}

export default SignUpSuccess