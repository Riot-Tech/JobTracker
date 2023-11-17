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
        <div>
            <AiOutlineClose onClick={close} />
            <input type='text' name='name' value={input.name} onChange={handleChange}/>
            {errors.name && <p>{errors.name}</p>}
            <input type="file" onChange={handleFileChange}/>
            {errors.file && <p>{errors.file}</p>}
            <label>
                <input type='checkbox' name='isCv' onChange={handleChange}/>
                Mark file as CV
            </label>

            <button onClick={handleSubmit}>
                <TickIcon/>
            </button>
        </div>
    )

};

export default CreateFile;
