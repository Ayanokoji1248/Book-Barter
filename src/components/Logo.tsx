import { FiBookOpen } from "react-icons/fi";


const Logo = () => {
    return (
        <div className="flex items-center">
            <div className="p-2 bg-white w-fit rounded-xl flex items-center">
                <FiBookOpen size={25} className="text-blue-500"/>
            </div>
            <h1 className="text-blue-500 font-bold text-3xl">Book Barter</h1>
        </div>
    )
}

export default Logo