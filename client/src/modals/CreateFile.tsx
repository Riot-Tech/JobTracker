import { useState, ChangeEvent } from 'react';
import { TickIcon } from '../utils/svg'
import { AiOutlineClose } from 'react-icons/ai'
// import { IoAlertCircle } from "react-icons/io5";
import { AppStore } from '../models/interfaces';
import { URL } from '../utils/url';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFile } from '../redux/slices/files.slice';
import  {validateFileInput, validateFile } from '../utils/validateCreateFile';
import { hasErrorsFile } from '../utils/utilities';

type CloseFunction = () => void;

function CreateFile({ close }: { close: CloseFunction }) {
    const dispatch = useDispatch();
    const activeUser = useSelector((store: AppStore) => store.user);

    const [confirmed, setConfirmed] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [input, setInput] = useState({
        name: '',
        isCv: false,
    });
    const [errors, setErrors] = useState({
        name: '',
        file: '',
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newfile = e.target.files? e.target.files[0] : null;
        setFile(newfile);
        setErrors(validateFile(newfile, errors));
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newInput = {...input};
        const name = event.target.name;

        if (name === 'isCv') {
            newInput[name] = event.target.checked;
        } else {
            newInput = {
                ...newInput,
                [name]: event.target.value
            };
        };
        setInput(newInput);
        setErrors(validateFileInput(newInput, errors));
    }

    const handleSubmit = async() => {
        try {
            if (!hasErrorsFile(errors) && file) {
                const fileData = {
                    ...input,
                    url: '',
                    userId: activeUser.id,
                }

                const formData = new FormData();
                formData.append('file', file);
                formData.append('data', JSON.stringify(fileData));

                const response = await axios.post(`${URL}/file`, formData)

                if (response.status === 200) {
                    console.log("File uploaded successfully")
                    const { data } = await axios.get(`${URL}/file/?id=${activeUser.id}`);
                    if (data.length) {
                        setConfirmed(true);
                        dispatch(addFile(data));
                        return;
                    };
                };
            };
        } catch (error) {
            console.error(error);
        };
    };


    return (
        <div className='fixed inset-0 z-20 flex backdrop-brightness-90 flex-col items-center justify-center backdrop-blur-sm'>
            <AiOutlineClose onClick={close} className='text-4xl text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-400'/>
            <div className='h-[50vh] w-[25vw] bg-custom-modalLight rounded-xl text-black flex flex-col p-20 justify-around items-center text-center dark:text-white dark:bg-custom-modalDark'>
                <input type='text' name='name' value={input.name} onChange={handleChange} placeholder='File Name' className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.name && 'bg-black border-2 border-red-700 rounded-md'}`}/>

                <input id="fileInput" type="file" onChange={handleFileChange} className="hidden"/>
                <label htmlFor="fileInput" className={`py-2 px-4 bg-red-500 text-white rounded-md cursor-pointer border-transparent border-2 hover:border-2 hover:border-blue-400 ${file ?  'bg-green-500 ring ring-green-400' : 'bg-red-500'}`}>Choose file</label>
                <label className='w-60 h-15 overflow-hidden'>{(file && file.name) || (errors.file && errors.file)}</label>

                <label>
                    <input type='checkbox' name='isCv' onChange={handleChange}/>
                    Mark file as CV
                </label>

                <button onClick={handleSubmit} className={`flex items-center ${confirmed ? 'bg-green-500 ring ring-green-500' : 'bg-red-500'}`}>
                    <TickIcon/>
                    <h2 className='ml-1 text-white'>Confirm</h2>
                </button>
            </div>
        </div>
    )

};

export default CreateFile;
