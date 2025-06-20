import { NavLink, useNavigate } from "react-router-dom"
import { FaLock } from "react-icons/fa";
import LabeledInput from "../components/LabeledInput";
import Button from "../components/Button";
import { useState, type ChangeEvent } from "react";
import axios from "axios";
import { BACKEND_URI } from "../utlis";
import { toast, ToastContainer } from "react-toastify"

const LoginPage = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit() {
        try {
            const response = await axios.post(`${BACKEND_URI}/auth/login`, {
                email,
                password
            })

            const token = response.data.token;

            localStorage.setItem("token", token);
            toast.success("Successfull Login")
            setTimeout(() => {
                navigate('/browse')
            }, 1500)

        } catch (error) {
            console.log(error);
            toast.error("Invalid Credentials")
        }
    }

    return (
        <div className="shadow-2xl shadow-blue-200  flex flex-col gap-6 w-full xl:w-108 p-5 py-10 rounded-md justify-between">
            <ToastContainer />
            <div className="flex flex-col items-center gap-3 ">
                <div className="p-5 text-white bg-blue-500 rounded-xl">
                    <FaLock size={30} />
                </div>
                <div className="flex flex-col items-center gap-3">

                    <h1 className="text-black text-3xl font-bold">Sign In</h1>
                    <p className="text-sm text-zinc-500">Enter you credentials to access your account</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <LabeledInput labelName="Email" placeholder="Enter your email" type="email" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />

                <LabeledInput labelName="Password" placeholder="Enter your password" type="password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />


                <div>
                    <p className="text-sm font-medium text-zinc-600">Don't have account? <NavLink to={'/register'} className="text-blue-500 hover:text-blue-800 transition-all duration-300 font-bold">SignUp</NavLink></p>
                </div>

                <Button variant="primary" text="Sign In" widthFull={true} onClick={handleSubmit} />
            </div>

        </div>
    )
}

export default LoginPage