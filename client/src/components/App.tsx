import { useState } from 'react'
import { AppStore, Application } from '../models/interfaces';
import EditApplication from '../modals/EditApplication';
import axios from 'axios';
import { URL } from '../utils/url';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { BsTrash } from 'react-icons/bs';
import {  getApplications } from '../redux/slices/applications.slice';
import { EditIcon } from '../utils/svg';
import style from './App.module.css'

export default function App({ props }: { props: Application }) {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const activeUser = useSelector((store: AppStore) => store.user);
  const dispatch = useDispatch()

  const { company, location, status, jobName, expectedIncome, currency, jobType, id, feedback, comments } = props;

  const handleEdit = () => {
    setEditOpen(!editOpen)
  }

  const handleDelete = async () => {
    try {
      let response = await axios.patch(`${URL}/application/${id}`, { company, location, status, jobName, expectedIncome, currency, jobType, id, feedback, comments })

      if (response.status === 200) {
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
    <div className={`rounded-xl my-4 mt-4 mb-4 bg-gray-300 w-full flex flex-col justify-between shadow-xl drop-shadow-md border-2 dark:bg-gray-400 ${style.appContainer}`}>
      <div className="flex flex-row items-center justify-between">
        <h2 className=" text-xl font-bold w-[50%]">{company}</h2>
        <h2 className="font-bold mr-20">{status}</h2>
        <div className='relative flex justify-between'>
          <div className='flex gap-2 items-center'>
            <button
              className="h-10 bg-transparent mb-2 border-none"
              value={id}
              onClick={handleEdit}
            >
              <EditIcon dark={false}/>
            </button>
            <BsTrash onClick={handleDelete} className='p-1 rounded-[50%] text-4xl hover:cursor-pointer text-red-700' />
            
            {editOpen && <EditApplication props={props} close={() => { setEditOpen(!editOpen) }} />}
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-grow rounded-lg h-10 drop-shadow-md bg-white justify-between items-center p-5">
        <div className="flex flex-row ">
          <h2 className='font-bold mr-2'>Job:</h2><h2>{jobName}</h2>
        </div>
        <div className="flex flex-row">
          <h2 className='font-bold mr-2'>Job Type:</h2><h2>{jobType}</h2>
        </div>
        <div className="flex flex-row">
          <h2 className='font-bold mr-2'>Location:</h2><h2>{location}</h2>
        </div>
        <div className="flex flex-row">
          <h2 className='font-bold'>{expectedIncome} {currency}</h2>
        </div>
      </div>

    </div>
  )
}