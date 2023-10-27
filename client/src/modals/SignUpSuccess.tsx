import confirmation from '../assets/Icon Confirmation.gif'

function SignUpSuccess() {
  return (
    <div className='fixed top-4 right-4 h-[100px] w-[300px]'>
        <div className='flex'>
            <div className='flex justify-center items-center bg-white w-[60%] p-5 text-lg text-black font-bold'>
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