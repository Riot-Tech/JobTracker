// poner a los inputs type(checkbox, etc.), value(con el nombre que tiene en el back) 
export default function ApplicationForm() {
    return (
        <form className="flex w-full h-[100vh]">
            <div className="w-[50%] m-10">
                <div className="h-[20%]">
                    <div>
                        <input className="w-[30%] h-[65px] p-2 border rounded" type="text" placeholder="Company Name" />
                    </div>
                    <div>
                        <input className="w-[20%] p-2 border rounded" type="text" placeholder="Job Name" />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 h-[80%]">
                    <label> Date </label>
                    <input  />
                    <label> Job Type </label>
                    <input />
                    <label> Job Modality </label>
                    <input />
                    <label> Location </label>
                    <input />
                    <label> Currency </label>
                    <input />
                    <label> Expected Income </label>
                    <input />
                    <label> Status </label>
                    <input />
                </div>
            </div>
            <div className="w-[50%] m-10">
                <div className="flex flex-col">
                    <label> Feedback </label>
                    <textarea />
                </div>
                <div className="flex flex-col">
                    <label> Comments </label>
                    <textarea />
                </div>
            </div>
        </form>
    )
}