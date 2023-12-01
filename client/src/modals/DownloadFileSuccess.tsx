import confirmation from '../assets/Icon Confirmation.gif'

function DownloadFileSuccess() {
  return (
    <div className='fixed bg-white h-25 right-10 justify-center bottom-10 rounded-xl drop-shadow-xl shadow-xl overflow-hidden'>
        <div className='flex flex-row justify-center items-center'>
            <div className='flex   text-xl text-black font-bold rounded-xl pl-10'>
              <p>Your file has been downloaded.</p>
            </div>
            <div className='w-40 rounded-xl'>
              <img src={confirmation} className='' />
            </div>
        </div>
        {/* <div className='flex justify-center h-12 text-xl '>
              <p><a id="downloadLink" href='' target="_blank">Open file</a></p>
        </div> */}
    </div>
  )
}

export default DownloadFileSuccess