import { useState } from "react"
import { validateApplicationForm } from "../utils/validateAppForm";
import { useDispatch } from "react-redux";
import { URL } from "../utils/url";
import axios from "axios";
import { useSelector } from "react-redux";
import { AppStore, Application } from "../models/interfaces";
import { getApplications } from "../redux/slices/applications.slice";
import { AiOutlineClose } from "react-icons/ai";
import { CommentIcon, FeedbackIcon, JobModalityIcon, JobTypeIcon, LinkIcon, LocationIcon, MoneyIcon, TickIcon, WalletIcon } from "../utils/svg";

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

    return (
        <form className="fixed inset-0 z-20 flex flex-col items-center justify-center backdrop-brightness-90 backdrop-blur-sm">
            <AiOutlineClose onClick={close} className='text-4xl text-white bg-black rounded-2xl p-1 mb-4 hover: cursor-pointer hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-400'/>
            <div className="flex h-[80vh] w-[80vw] rounded-xl text-black bg-custom-modalLight dark:text-white dark:bg-custom-modalDark">
                <div className="flex flex-col justify-between w-[50vw] p-5">
                    <div>
                        <div className="flex items-center divide-black pb-5">
                            <input
                                className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.company.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                name="company"
                                type="text"
                                placeholder={company}
                                value={form.company}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center pb-5">
                            <input
                                className={`mr-1 p-1 bg-transparent border-b-2 border-black ${errors.jobName.length && 'bg-black border-2 border-red-700 rounded-md'}`}
                                name="jobName"
                                type="text"
                                placeholder={jobName}
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
                                className="text-gray-600 p-2 ml-4 rounded-xl"
                                value={form.jobType}
                                onChange={handleChange}
                            >
                                <optgroup label="Job Type">
                                    <option> {jobType} </option>
                                    <option> FULLTIME </option>
                                    <option> PART_TIME </option>
                                    <option> FREELANCE </option>
                                    <option> UNSPECIFIED </option>
                                </optgroup>
                            </select>
                        </div>
                        <div className="flex items-center">
                            <JobModalityIcon />
                            <select
                                name="jobModality"
                                className="text-gray-600 p-2 ml-4 rounded-xl" 
                                value={form.jobModality}
                                onChange={handleChange}
                            >
                                <optgroup label="Job Modality">
                                    <option> {jobModality} </option>
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
                                className="p-2 border rounded-xl ml-4 text-black"
                                type="text"
                                placeholder={location}
                                value={form.location}
                                onChange={handleChange}
                            />
                            {errors.location && <span className="text-red" > {errors.location}</span>}
                        </div>
                        <div className="flex items-center">
                            <LinkIcon />
                            <input
                                name="link"
                                className="p-2 border rounded-xl ml-4 text-black"
                                type="text"
                                placeholder={link}
                                value={form.link}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex items-center">
                            <MoneyIcon />
                            <input
                                name="currency"
                                className="p-2 border rounded-xl ml-4 text-black"
                                type="text"
                                placeholder={currency}
                                value={form.currency}
                                onChange={handleChange}
                            />
                            {errors.currency && <span className="text-red" > {errors.currency}</span>}
                        </div>
                        <div className="flex items-center">
                            <WalletIcon />
                            <input
                                name="expectedIncome"
                                className="flex flex-col p-2 border rounded-xl ml-4 text-black"
                                type="number"
                                placeholder={String(expectedIncome)}
                                value={form.expectedIncome}
                                onChange={handleChange}
                            />
                            {errors.expectedIncome && <span className="text-red" > {errors.expectedIncome}</span>}
                        </div>
                        <div className="flex items-center">
                            <JobModalityIcon/>
                            <select
                                name="status"
                                className="text-gray-600 p-2 ml-4 rounded-xl"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <optgroup label="Status">
                                    <option> {status} </option>
                                    <option> PENDING </option>
                                    <option> SUBMITTED </option>
                                    <option> INTERVIEW_SCHEDULED </option>
                                    <option> REJECTED </option>
                                </optgroup>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="w-[50%] flex flex-col p-5">
                    <div className="flex justify-end ">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className={`flex items-center ${confirmed ? 'bg-green-400 ring ring-green-400' : 'bg-red-500'}`}
                        >
                          
                            <TickIcon/>
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
                        placeholder={feedback}
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
                            placeholder={comments}
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}