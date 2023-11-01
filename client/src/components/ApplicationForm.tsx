import { useState } from "react"

// poner a los inputs type(checkbox, etc.), value(con el nombre que tiene en el back) 
export default function ApplicationForm() {

    const [form, setForm] = useState({
        jobName: '',
        company: '',
        jobType: '',
        jobModality: '',
        location: '',
        date: '',
        expectedIncome: '',
        currency: '',
        status: '',
        feedback: '',
        comments: '',
        links: '',
    });

    const [errors, setErrors] = useState({
        jobName: '',
        company: '',
        jobType: '',
        jobModality: '',
        location: '',
        date: '',
        expectedIncome: '',
        currency: '',
        status: '',
        feedback: '',
        comments: '',
        links: '',
    })

    const handleChange = (e: any) => {
        let property = e.target.name;
        let value = e.target.value;
        setForm(
            (prevForm) => ({
              ...prevForm,
              [property]: value,
            }),
          );
        };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // let value = e.target.value;
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit} className="flex w-full h-[100vh]">
            <div className="w-[50%] m-10">
                <div className="h-[20%]">
                    <div className="flex items-center">
                        <input
                            className="w-[45%] h-[65px] p-2 border rounded mr-4 text-black"
                            name="company"
                            type="text"
                            placeholder="Company Name"
                            value={form.company}
                            onChange={handleChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                            <path d="M2 27H14.5H27" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.8081 5.92838L18.7366 2L25.6111 8.87465L21.6828 12.803M14.8081 5.92838L7.02117 13.7153C6.76071 13.9758 6.61438 14.3291 6.61438 14.6974V20.9967H12.9138C13.2821 20.9967 13.6353 20.8505 13.8959 20.5899L21.6828 12.803M14.8081 5.92838L21.6828 12.803" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <div className="flex items-center">
                        <input
                            className="w-[30%] p-2 border rounded mr-4 text-black"
                            name="jobName"
                            type="text"
                            placeholder="Job Name"
                            value={form.jobName}
                            onChange={handleChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                            <path d="M2 27H14.5H27" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14.8081 5.92838L18.7366 2L25.6111 8.87465L21.6828 12.803M14.8081 5.92838L7.02117 13.7153C6.76071 13.9758 6.61438 14.3291 6.61438 14.6974V20.9967H12.9138C13.2821 20.9967 13.6353 20.8505 13.8959 20.5899L21.6828 12.803M14.8081 5.92838L21.6828 12.803" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
                <div className="flex flex-col gap-4 h-[80%]">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="36" viewBox="0 0 34 36" fill="none">
                            <path d="M22 5.33333V2M22 5.33333V8.66667M22 5.33333H14.5M2 15.3333V30.3333C2 32.1743 3.49238 33.6667 5.33333 33.6667H28.6667C30.5077 33.6667 32 32.1743 32 30.3333V15.3333H2Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 15.3334V8.66671C2 6.82576 3.49238 5.33337 5.33333 5.33337H8.66667" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M8.66663 2V8.66667" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M32 15.3334V8.66671C32 6.82576 30.5077 5.33337 28.6667 5.33337H27.8334" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            name="date"
                            className="p-2 border rounded w-[30%] text-gray-600 ml-4"
                            type="date"
                            placeholder="Date"
                            value={form.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="37" viewBox="0 0 34 37" fill="none">
                            <path d="M25.3333 20.3332H17V11.9999" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M5.33325 4.5L8.66659 2" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M28.6666 4.5L25.3333 2" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17 35.3333C25.2843 35.3333 32 28.6176 32 20.3333C32 12.049 25.2843 5.33325 17 5.33325C8.71573 5.33325 2 12.049 2 20.3333C2 28.6176 8.71573 35.3333 17 35.3333Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <select
                            name="jobType"
                            className="text-gray-600 h-7 w-[30%] ml-4"
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
                        </select>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M17 32C25.2842 32 32 25.2842 32 17C32 8.71572 25.2842 2 17 2C8.71572 2 2 8.71572 2 17C2 25.2842 8.71572 32 17 32Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.75 17.75L11 20.75L9.5 26L11 30.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M24.5 29.75L23.75 26L20 24.5V19.25L24.5 17.75L31.25 18.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M27.5 7.25L26.75 9.5L21.5 10.25V14.75L25.25 13.25H28.25L31.25 14.75" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.75 14.75L6.5 11.75L10.25 11L13.25 6.5L11.75 3.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <select
                            name="jobModality"
                            className="text-gray-600 h-7 w-[30%] ml-4"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="42" viewBox="0 0 34 42" fill="none">
                            <path d="M32 17C32 25.2843 17 39.5 17 39.5C17 39.5 2 25.2843 2 17C2 8.71573 8.71572 2 17 2C25.2843 2 32 8.71573 32 17Z" stroke="#4C4C4C" stroke-width="3" />
                            <path d="M17 18.875C18.0356 18.875 18.875 18.0356 18.875 17C18.875 15.9645 18.0356 15.125 17 15.125C15.9644 15.125 15.125 15.9645 15.125 17C15.125 18.0356 15.9644 18.875 17 18.875Z" fill="#4C4C4C" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            name="location"
                            className="w-[30%] p-2 h-7 border rounded ml-4 text-black"
                            type="text"
                            placeholder="Location"
                            value={form.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M31.6549 16.8275C31.6549 8.63847 25.0164 2 16.8275 2C8.63847 2 2 8.63847 2 16.8275C2 25.0164 8.63847 31.6549 16.8275 31.6549" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M18.3101 2.07312C18.3101 2.07312 22.7584 7.93088 22.7584 16.8273" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M15.3447 31.5817C15.3447 31.5817 10.8964 25.7238 10.8964 16.8273C10.8964 7.93088 15.3447 2.07312 15.3447 2.07312" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.93365 22.0171H16.8275" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.93365 11.6378H30.7214" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.4754 25.6015C32.2076 26.0518 32.1625 27.148 31.4084 27.2336L27.6028 27.6649L25.8958 31.0934C25.5576 31.7728 24.5121 31.4403 24.3393 30.5982L22.478 21.5297C22.3319 20.818 22.9716 20.3701 23.5903 20.7508L31.4754 25.6015Z" stroke="#4C4C4C" stroke-width="3" />
                        </svg>
                        <input
                            name="links"
                            className="w-[50%] p-2 h-7 border rounded ml-4 text-black"
                            type="text"
                            placeholder="Link"
                            value={form.links}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M17 32C25.2842 32 32 25.2842 32 17C32 8.71572 25.2842 2 17 2C8.71572 2 2 8.71572 2 17C2 25.2842 8.71572 32 17 32Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21.5 11.75C20.4725 10.7225 18.6631 10.0078 17 9.96308M17 9.96308C15.0213 9.90983 13.25 10.805 13.25 13.25C13.25 17.75 21.5 15.5 21.5 20C21.5 22.5665 19.3043 23.6693 17 23.5865M17 9.96308V7.25M12.5 21.5C13.4667 22.7889 15.2642 23.5241 17 23.5865M17 23.5865V26.75" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            name="currency"
                            className="w-[30%] p-2 h-7 border rounded ml-4 text-black"
                            type="text"
                            placeholder="Currency"
                            value={form.currency}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="31" viewBox="0 0 34 31" fill="none">
                            <path d="M28.6667 29.3298H5.33333C3.49238 29.3298 2 27.8374 2 25.9964V10.9964C2 9.15547 3.49238 7.66309 5.33333 7.66309H28.6667C30.5077 7.66309 32 9.15547 32 10.9964V25.9964C32 27.8374 30.5077 29.3298 28.6667 29.3298Z" stroke="#4C4C4C" stroke-width="3" />
                            <path d="M24.5 19.3298C24.0399 19.3298 23.6667 18.9566 23.6667 18.4964C23.6667 18.0363 24.0399 17.6631 24.5 17.6631C24.9602 17.6631 25.3334 18.0363 25.3334 18.4964C25.3334 18.9566 24.9602 19.3298 24.5 19.3298Z" fill="#4C4C4C" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M27 7.66312V5.33515C27 3.14505 24.924 1.55007 22.8078 2.11437L4.47445 7.00327C3.01528 7.39239 2 8.71389 2 10.2241V10.9965" stroke="#4C4C4C" stroke-width="3" />
                        </svg>
                        <input
                            name="expectedIncome"
                            className="w-[30%] flex flex-col p-2 border rounded ml-4 text-black"
                            type="text"
                            placeholder="Expected Income"
                            value={form.expectedIncome}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <path d="M17 32C25.2842 32 32 25.2842 32 17C32 8.71572 25.2842 2 17 2C8.71572 2 2 8.71572 2 17C2 25.2842 8.71572 32 17 32Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.75 17.75L11 20.75L9.5 26L11 30.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M24.5 29.75L23.75 26L20 24.5V19.25L24.5 17.75L31.25 18.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M27.5 7.25L26.75 9.5L21.5 10.25V14.75L25.25 13.25H28.25L31.25 14.75" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2.75 14.75L6.5 11.75L10.25 11L13.25 6.5L11.75 3.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <select
                            name="status"
                            className="text-gray-600 h-7 w-[30%] ml-4"
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
                    </div>
                </div>
            </div>
            <div className="w-[50%] m-10">
                <div className="flex flex-col">
                    <div className="pr-0 ">
                        <button 
                            className=" flex items-center justify-around w-40 h-52px  bg-red-800"
                            type="submit"
                            >
                            {<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                <path d="M11.375 15.125L17 20.75L32 5.75" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M32 17C32 25.2843 25.2843 32 17 32C8.71572 32 2 25.2843 2 17C2 8.71572 8.71572 2 17 2C18.7762 2 20.4802 2.3087 22.0614 2.87536" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>} Confirm </button>
                    </div>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <path d="M33.5 19.5V35.95C33.5 36.5299 33.0299 37 32.45 37H6.55C5.9701 37 5.5 36.5299 5.5 35.95V19.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M35.95 10.75H3.05C2.4701 10.75 2 11.2201 2 11.8V18.45C2 19.0299 2.4701 19.5 3.05 19.5H35.95C36.5299 19.5 37 19.0299 37 18.45V11.8C37 11.2201 36.5299 10.75 35.95 10.75Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.5 37V10.75" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.5 10.75H11.625C10.4647 10.75 9.35187 10.2891 8.5314 9.4686C7.71093 8.64813 7.25 7.53532 7.25 6.375C7.25 5.21468 7.71093 4.10187 8.5314 3.2814C9.35187 2.46093 10.4647 2 11.625 2C17.75 2 19.5 10.75 19.5 10.75Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.5 10.75H27.375C28.5352 10.75 29.6481 10.2891 30.4686 9.4686C31.289 8.64813 31.75 7.53532 31.75 6.375C31.75 5.21468 31.289 4.10187 30.4686 3.2814C29.6481 2.46093 28.5352 2 27.375 2C21.25 2 19.5 10.75 19.5 10.75Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <label className="ml-4"> Feedback </label>
                    </div>
                    <textarea
                        name="feedback"
                        value={form.feedback}
                        className=" h-[180px] mt-3 text-black"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col mt-3">
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
                            <path d="M12.5 16H19.5H26.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12.5 23H16H19.5" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M19.5 37C29.1649 37 37 29.1649 37 19.5C37 9.83501 29.1649 2 19.5 2C9.83501 2 2 9.83501 2 19.5C2 22.6875 2.8522 25.6759 4.34119 28.25L2.875 36.125L10.75 34.6589C13.324 36.1478 16.3125 37 19.5 37Z" stroke="#4C4C4C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <label className="ml-4"> Comments </label>
                    </div>

                    <textarea
                        name="comments"
                        value={form.comments}
                        className=" h-[180px] mt-3 text-black"
                        onChange={handleChange}
                    />
                </div>
            </div>
        </form>
    )
}