import confirmation from '../assets/Icon Confirmation.gif'

function SignUpSuccess() {
  return (
    <div className='fixed bg-white h-25 right-10 z-10 justify-center bottom-10 rounded-xl drop-shadow-xl shadow-xl overflow-hidden'>
      <div className='flex flex-row justify-center items-center'>
        <div className='flex   text-xl text-black font-bold rounded-xl pl-10'>
          <p>User created!</p>
        </div>
        <div className='w-40 rounded-xl'>
          <img src={confirmation} className='' />
        </div>
      </div>
    </div>
  )
}

export default SignUpSuccess