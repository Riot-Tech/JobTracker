import { useState, ChangeEvent } from 'react';
import { TickIcon } from '../utils/svg'
import { AiOutlineClose } from 'react-icons/ai'
import { AppStore } from '../models/interfaces';
import { URL } from '../utils/url';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFile } from '../redux/slices/files.slice';
import  { validateFile } from '../utils/validateCreateFile';
import { hasErrorsFile } from '../utils/utilities';
import { TiTick } from "react-icons/ti";
import style from './CreateFile.module.css'

type CloseFunction = () => void;

function CreateFile({ close }: { close: CloseFunction }) {
    const dispatch = useDispatch();
    const activeUser = useSelector((store: AppStore) => store.user);

    const [confirmed, setConfirmed] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [input, setInput] = useState({
        isCv: false,
    });
    const [errors, setErrors] = useState({
        file: '',
    });

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newFile = e.target.files? e.target.files[0] : null;
        setFile(newFile);
        let newErrors = validateFile(newFile, errors);
        setErrors(newErrors);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        let newInput = {...input};
        const name = event.target.name;

        if (name === 'isCv') {
            newInput[name] = event.target.checked;
        };
        setInput(newInput);
    }

    const handleSubmit = async() => {
        try {
            if (!hasErrorsFile(errors) && file) {
                const fileData = {
                    ...input,
                    name: file.name,
                    url: '',
                    userId: activeUser.id,
                };

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
            console.log("Error uploading file");
        };
    };


    return (
        <div className='fixed inset-0 z-20 flex flex-col items-center justify-center backdrop-brightness-90 backdrop-blur-md overflow-auto'>
            
            <AiOutlineClose onClick={close} className={`${style.cross} text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-400`}/>

            <div className={`flex flex-col items-center gap-2 text-center max-h-[60%] ${style.mainContainer} bg-custom-modalLight rounded-xl text-black dark:text-white dark:bg-custom-modalDark`}>
                
                <label>{(file && file.name) || (errors.file && errors.file) || 'Please select a file to upload'}</label>
                <label htmlFor="fileInput" className={`flex ${style.chooseFile} bg-red-500 text-white rounded-md cursor-pointer border-transparent border-2 hover:border-2 hover:border-blue-400 ${file ?  'bg-green-500 ring ring-green-400' : 'bg-red-500'}`}>Choose file</label>

                <div className='flex items-center'>
                    <input type='checkbox' name='isCv' onChange={handleChange}/>
                    Mark file as CV
                </div>

                <button onClick={handleSubmit} className={`flex items-center ${style.chooseFile} ${confirmed ? 'bg-green-500 ring ring-green-500' : 'bg-red-500'}`}>
                    <TiTick className='text-white' />
                    <h2 className='ml-1 text-white'>Confirm</h2>
                </button>
            </div>
        </div>
    )

};

export default CreateFile;
