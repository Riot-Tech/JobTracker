import { useState } from 'react'
import { AppStore, Application } from '../models/interfaces';

import EditApplication from '../modals/EditApplication';
import axios from 'axios';
import { URL } from '../utils/url';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import { createApplication, getApplications } from '../redux/slices/applications.slice';

export default function App({ props }: { props: Application }) {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const activeUser = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch()

  const { company, location, status, jobName, expectedIncome, currency, jobType, id, feedback, comments } = props;

  const handleEdit = () => {
    setEditOpen(!editOpen)
  }

  const handleDelete = async ()=> {
    try {
      let response = await axios.patch(`${URL}/application/${id}`, {company, location, status, jobName, expectedIncome, currency, jobType, id, feedback, comments})

      if(response.status === 200){
        let { data } = await axios.get(`${URL}/application/?id=${activeUser.id}`);
        if (data.length) {
          dispatch(getApplications(data)); //lleno el estado global de spontaneous, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo
          return;
        }
        dispatch(getApplications(data)) //si borro todas las spontaneas mando un arreglo vacio [] para que este sea el arreglo global
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="p-5 rounded-xl my-4 mt-4 mb-4 shadow-lg dark:bg-stone-900 w-full flex flex-col justify-between">
        <div className="flex flex-row justify-between items-center">
        
          <h2 className=" text-xl ">{company}</h2>
          <h2>{status}</h2>
        <div className='relative flex justify-between'>
        <div className='flex gap-2 items-center right-2'>

          <button
            className="h-10 bg-transparent mb-4"
            value={id}
            onClick={handleEdit}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
              <path d="M2 27H14.5H27" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M14.8081 5.92838L18.7366 2L25.6111 8.87465L21.6828 12.803M14.8081 5.92838L7.02117 13.7153C6.76071 13.9758 6.61438 14.3291 6.61438 14.6974V20.9967H12.9138C13.2821 20.9967 13.6353 20.8505 13.8959 20.5899L21.6828 12.803M14.8081 5.92838L21.6828 12.803" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          {editOpen && <EditApplication props={props} close={()=>{setEditOpen(!editOpen)}}/>}
          <div>
            <BsTrash onClick={handleDelete} className='absolute p-1 rounded-[50%] text-4xl left-28 bottom-9 hover:cursor-pointer text-red-700'/>
          </div>
          </div>
          </div>


        </div>
        <div className="flex flex-row flex-grow rounded-xl h-10 bg-red-100 justify-between items-center p-2">
          <div className="flex flex-row">
            <h2> Job: {jobName}</h2>
          </div>
          <div className="flex flex-row">
            <h2> Job Type: {jobType}</h2>
          </div>
          <div className="flex flex-row">
            <h2> Location: {location}</h2>
          </div>
          <div className="flex flex-row">
            <h2>{expectedIncome} {currency}</h2>
          </div>
          {/* <div className="flex flex-row">
                        <h2>{feedback}</h2>
                      </div>
                      <div className="flex flex-row">
                        <h2>{comments}</h2>
                      </div> */}
        </div>
      </div>
  )}