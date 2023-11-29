import { useState } from "react"
import { validateApplicationForm } from "../utils/validateAppForm";
import { useDispatch } from "react-redux";
import { URL } from "../utils/url";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppStore } from "../models/interfaces";
import { getApplications } from "../redux/slices/applications.slice";
import { AiOutlineClose } from "react-icons/ai";
import { CommentIcon, FeedbackIcon, JobModalityIcon, JobTypeIcon, LinkIcon, LocationIcon, MoneyIcon, TickIcon, WalletIcon } from "../utils/svg";
import { IoAlertCircle } from "react-icons/io5";

type CloseFunction = () => void;

export default function CreateApplication({ close }: { close: CloseFunction }) {
    const activeUser = useSelector((store: AppStore) => store.user);
    const [ confirmed, setConfirmed ]= useState(false)

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        jobName: '',
        company: '',
        jobType: '',
        jobModality: '',
        location: '',
        expectedIncome: 0,
        currency: '',
        status: '',
        feedback: '',
        comments: '',
        link: ''
    });

    const [errors, setErrors] = useState({
        jobName: '',
        company: '',
        jobType: '',
        jobModality: '',
        location: '',
        expectedIncome: '',
        currency: '',
        status: '',
        feedback: '',
        comments: '',
        link: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        let property = e.target.name;
        let value = e.target.value;
        if (property === 'expectedIncome') {
            let expectedIncomeValue = parseInt(value);
            setForm(
                (prevForm) => ({
                    ...prevForm,
                    [property]: expectedIncomeValue,
                }),
            );

        } else {
            setForm(
                (prevForm) => ({
                    ...prevForm,
                    [property]: value,
                    userId: activeUser.id
                }),
            );
            setErrors(
                validateApplicationForm({
                    ...form,
                    [property]: value
                })
            );
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let  response = await axios.post(`${URL}/application`, (activeUser.id, form));
            if(response.status === 200){
                let  { data }  = await axios.get(`${URL}/application/?id=${activeUser.id}`);
                if (data.length) {
                    setConfirmed(true);
                    dispatch(getApplications(data));
                    return;
                }
            }
            return;
        } catch (error) {
            console.log(error);
        }
    }
    const hasErrors = Object.values(errors).some((error) => !!error);
    

    return (
        <form className="fixed inset-0 z-20 flex backdrop-brightness-90 flex-col items-center justify-center backdrop-blur-sm">
            <AiOutlineClose onClick={close} className='text-4xl text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-400'/>
            <div className="flex h-[80vh] w-[80vw] rounded-xl text-black bg-custom-modalLight dark:text-white dark:bg-custom-modalDark">
                <div className="flex flex-col justify-between w-[50vw] p-5">
                    <div className="h-[50vh] bg-red divide-black ">
                        <div className="flex items-center divide-black pb-5">
                            <input
                                className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.company.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                name="company"
                                type="text"
                                placeholder="Company Name"
                                value={form.company}
                                onChange={handleChange}
                            />
                            {/* {errors.company && <span className="text-red-800" > {errors.company}</span>} */}
                        </div>
                        <div className="flex items-center pb-5">
                            <input
                                className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.jobName.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                name="jobName"
                                type="text"
                                placeholder="Job Name"
                                value={form.jobName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center">
                            <JobTypeIcon />
                            <select
                                name="jobType"
                                className="text-gray-600 h-[45px] w-[30%] ml-2 rounded-xl p-3  "
                                value={form.jobType}
                                onChange={handleChange}
                            >
                                <optgroup label="Job Type">
                                    <option> Job Type </option>
                                    <option> FULLTIME </option>
                                    <option> PART_TIME </option>
                                    <option> FREELANCE </option>
                                    <option> UNSPECIFIED </option>
                                </optgroup>
                                { errors.jobType && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <JobModalityIcon />
                            <select
                                name="jobModality"
                                className="text-gray-600 h-[45px] w-[30%] ml-2 rounded-xl p-3"
                                value={form.jobModality}
                                onChange={handleChange}
                            >
                                <optgroup label="Job Modality">
                                    <option> Job Modality </option>
                                    <option> REMOTE </option>
                                    <option> ONSITE </option>
                                    <option> HYBRID </option>
                                    <option> UNSPECIFIED </option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <LocationIcon />
                            <input
                                name="location"
                                className="w-[30%] h-[45px] border ml-2 rounded-xl p-3 text-black"
                                type="text"
                                placeholder="Location"
                                value={form.location}
                                onChange={handleChange}
                            />
                            {errors.location && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                        </div>
                        <div className="flex items-center">
                            <LinkIcon />
                            <input
                                name="link"
                                className="w-[50%] ml-2 rounded-xl p-3 h-[45px] border text-black"
                                type="text"
                                placeholder="Link"
                                value={form.link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <MoneyIcon />
                            <input
                                name="currency"
                                className="w-[30%] h-[45px] border ml-2 rounded-xl p-3 text-black"
                                type="text"
                                placeholder="Currency"
                                value={form.currency}
                                onChange={handleChange}
                            />
                            {errors.currency && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                        </div>
                        <div className="flex items-center">
                            <WalletIcon />
                            <input
                                name="expectedIncome"
                                className="w-[30%] h-[45px] flex flex-col ml-2 rounded-xl p-3 border text-black"
                                type="number"
                                placeholder="Expected Income"
                                value={form.expectedIncome}
                                onChange={handleChange}
                            />
                            {errors.expectedIncome && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                        </div>
                        <div className="flex items-center">
                            <JobModalityIcon/>
                            <select
                                name="status"
                                className="text-gray-600 p-3 ml-2 rounded-xl"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <optgroup label="Status">
                                    <option> Status </option>
                                    <option> PENDING </option>
                                    <option> SUBMITTED </option>
                                    <option> INTERVIEW_SCHEDULED </option>
                                    <option> REJECTED </option>
                                </optgroup>
                            </select>
                            {errors.status && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                        </div>
                    </div>
                </div>
                <div className="w-[50%] flex flex-col p-5">
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={hasErrors || Object.values(errors).some((error) => error !== '')}
                            onClick={handleSubmit}
                            className={`flex items-center ${confirmed ? 'bg-green-400 ring ring-green-400' : 'bg-red-500'}`}
                            >
                            {<TickIcon/>}
                            <h2 className='ml-1 text-white'>Confirm</h2>
                        </button>
                    </div>
                    <div className="flex items-center mt-5">
                        <FeedbackIcon />
                        <label className="ml-4"> Feedback </label>
                    </div>
                    <textarea
                        name="feedback"
                        value={form.feedback}
                        className=" h-[180px] mt-3 text-black p-2"
                        onChange={handleChange}
                        placeholder="Any feedback from the company (e.g., interview experience, comments, or follow-up notes)"
                    />
                    <div className="flex flex-col mt-5">
                        <div className="flex items-center">
                            <CommentIcon />
                            <label className="ml-4"> Comments </label>
                        </div>

                        <textarea
                            name="comments"
                            value={form.comments}
                            className=" h-[180px] mt-3 text-black p-2"
                            onChange={handleChange}
                            placeholder="Feel free to write any comments you'd like here."
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}