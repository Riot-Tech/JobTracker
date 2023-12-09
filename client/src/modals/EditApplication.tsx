import { useState } from "react"
import { validateApplicationForm } from "../utils/validateAppForm";
import { useDispatch } from "react-redux";
import { URL } from "../utils/url";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppStore, Application } from "../models/interfaces";
import { getApplications } from "../redux/slices/applications.slice";
import { AiOutlineClose } from "react-icons/ai";
import { TickIcon } from "../utils/svg";
import { FaLocationDot, FaRegCommentDots } from "react-icons/fa6";
import { RiArrowGoBackFill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlinePendingActions, MdOutlineWatchLater } from "react-icons/md";
import { IoAlertCircle, IoWalletOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import style from './CreateApp.module.css'

type CloseFunction = () => void;

export default function EditApplication({ close, props }: { close: CloseFunction, props: Application }) {
    const activeUser = useSelector((store: AppStore) => store.user);
    const [confirmed, setConfirmed] = useState(false)

    const dispatch = useDispatch();

    const { company, location, status, jobName, expectedIncome, currency, jobType, id, link, feedback, comments, jobModality } = props;

    const [form, setForm] = useState({
        jobName: jobName,
        company: company,
        jobType: jobType,
        jobModality: jobModality,
        location: location,
        expectedIncome: expectedIncome,
        currency: currency,
        status: status,
        feedback: feedback,
        comments: comments,
        link: link
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

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(form, id)
        try {
            let response = await axios.patch(`${URL}/application`, { ...form, id: id });
            if (response.status === 200) {
                let { data } = await axios.get(`${URL}/application//?id=${activeUser.id}`);

                if (data.length) {
                    setConfirmed(true);

                    dispatch(getApplications(data)); //lleno el estado global de aplications, que ahora que lo pienso podria no ser global, y luego me lo traigo y las renderizo
                    return;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hasErrors = Object.values(errors).some((error) => !!error);

    return (
        <form className="fixed inset-0 flex flex-col items-center justify-center z-20 backdrop-brightness-90 backdrop-blur-sm drop-shadow-lg">
        <AiOutlineClose onClick={close} className='text-4xl text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-400'/>
        <div className="flex h-[80%] w-[80%] rounded-xl text-black bg-custom-modalLight dark:text-white dark:bg-custom-modalDark overflow-y-auto">
            
            <div className="flex flex-col p-10 w-1/2">
                
                <div className=" bg-red divide-black w-full drop-shadow-lg">
                    <div className="flex items-center pb-5">
                        <input
                            className={`w-[60%] mr-1 p-1 bg-transparent text-3xl border-b-2 border-black ${errors.company.length && 'bg-black border-2 border-red-700 rounded-md'}`}
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
                            className={`w-[60%] mr-1 p-1 bg-transparent text-2xl border-b-2 border-black ${errors.jobName.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                            name="jobName"
                            type="text"
                            placeholder="Job Name"
                            value={form.jobName}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[1.5em] mt-10 drop-shadow-lg">
                    <div className={`flex items-center ${style.inputContainer}`}>
                        <MdOutlineWatchLater className='text-4xl' />
                        <select
                            name="jobType"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
                            value={form.jobType}
                            onChange={handleChange}
                        >
                            <optgroup label="Choose type">
                                <option> Job Type </option>
                                <option> FULLTIME </option>
                                <option> PART_TIME </option>
                                <option> FREELANCE </option>
                                <option> UNSPECIFIED </option>
                            </optgroup>
                            { errors.jobType && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                        </select>
                    </div>
                    <div className={`flex items-center ${style.inputContainer}`}>
                        <FaHome className='text-4xl'/>
                        <select
                            name="jobModality"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
                            value={form.jobModality}
                            onChange={handleChange}
                        >
                            <optgroup label="Choose modality">
                                <option> Job Modality </option>
                                <option> REMOTE </option>
                                <option> ONSITE </option>
                                <option> HYBRID </option>
                                <option> UNSPECIFIED </option>
                            </optgroup>
                        </select>
                    </div>
                    <div className={`flex items-center ${style.inputContainer}`}>
                        <FaLocationDot className='text-4xl'/>
                        <input
                            name="location"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
                            type="text"
                            placeholder="Location"
                            value={form.location}
                            onChange={handleChange}
                        />
                        {errors.location && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                    </div>
                    <div className={`flex items-center ${style.inputContainer}`}>
                        <CiLink className='text-4xl'/>
                        <input
                            name="link"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
                            type="text"
                            placeholder="Link"
                            value={form.link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={`flex items-center ${style.inputContainer}`}>
                    <RiMoneyDollarCircleLine className='text-4xl'/>
                        <input
                            name="currency"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
                            type="text"
                            placeholder="Currency"
                            value={form.currency}
                            onChange={handleChange}
                        />
                        {errors.currency && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                    </div>
                    <div className={`flex items-center ${style.inputContainer}`}>
                        <IoWalletOutline className='text-4xl'/>
                        <input
                            name="expectedIncome"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
                            type="number"
                            placeholder="Expected Income"
                            value={form.expectedIncome}
                            onChange={handleChange}
                        />
                        {errors.expectedIncome && <IoAlertCircle className='items-center text-3xl text-red-600 ml-1' />}
                    </div>
                    <div className={`flex items-center ${style.inputContainer}`}>
                        <MdOutlinePendingActions className='text-4xl'/>
                        <select
                            name="status"
                            className="w-1/2 text-gray-600 ml-6 rounded-lg p-2"
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
            <div className="w-[50%] flex flex-col p-10 pl-0 h-full drop-shadow-lg">
                <div className="flex justify-end ">
                    <button
                        type="submit"
                        disabled={hasErrors || Object.values(errors).some((error) => error !== '')}
                        onClick={handleSubmit}
                        className={`flex items-center ${confirmed ? 'bg-green-400 ring ring-green-400' : 'bg-red-500 hover:scale-110 transition-transform'}`}
                        >
                        {<TickIcon/>}
                        <h2 className='ml-1 text-white'>Confirm</h2>
                    </button>
                </div>

                <div className="flex flex-col mt-5 p-1 h-full"> 
                    <div className="flex items-center">
                        <RiArrowGoBackFill className='text-2xl' />
                        <label className="ml-4 text-xl"> Feedback </label>
                    </div>
                    <textarea
                        name="feedback"
                        value={form.feedback}
                        className="h-full text-black p-2 mt-3 rounded-lg"
                        onChange={handleChange}
                        placeholder="Any feedback from the company (e.g., interview experience, comments, or follow-up notes)"
                    />
                </div>

                <div className="flex flex-col mt-5 p-1 h-full">
                    <div className="flex items-center">
                        <FaRegCommentDots className='text-2xl' />
                        <label className="ml-4 text-xl"> Comments </label>
                    </div>

                    <textarea
                        name="comments"
                        value={form.comments}
                        className="h-full text-black p-2 mt-3 rounded-lg"
                        onChange={handleChange}
                        placeholder="Feel free to write any comments you'd like here."
                    />
                </div>
            </div>
        </div>
    </form>
    )
}