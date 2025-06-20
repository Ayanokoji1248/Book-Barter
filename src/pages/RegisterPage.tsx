import { IoPersonSharp } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import type { ChangeEvent } from "react";

import LabeledInput from "../components/LabeledInput";
import Button from "../components/Button";
import { BACKEND_URI } from "../utlis";
import { toast, ToastContainer } from "react-toastify";

export type Place = {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country?: string;
    };
};


const RegisterPage = () => {
    const navigate = useNavigate()

    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [city, setCity] = useState<string>("");
    const [suggestions, setSuggestions] = useState<Place[]>([]);

    const handleCityChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setCity(query);

        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const res = await axios.get<Place[]>(
                `https://nominatim.openstreetmap.org/search?q=${query}&format=json&addressdetails=1&countrycodes=in&limit=5`
            );
            setSuggestions(res.data);
        } catch (err) {
            console.error("Location fetch error:", err);
        }
    };

    const handleSelectCity = (place: Place) => {
        setCity(place.display_name);
        setSuggestions([]);
    };


    const handleRegister = async () => {
        try {
            const response = await axios.post(`${BACKEND_URI}/auth/register`, {
                fullName,
                email,
                city,
                password,
                location: city
            });

            const token = response.data.token;

            localStorage.setItem("token", token)
            setTimeout(() => {
                toast.success("Register Successfull")
                navigate('/browse')
            }, 1500)

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }

    }

    return (
        <div className="shadow-2xl shadow-blue-200 flex flex-col gap-6 w-full xl:w-108 p-5 py-10 rounded-md justify-between">
            <ToastContainer />
            <div className="flex flex-col items-center gap-3">
                <div className="p-5 text-white bg-blue-500 rounded-xl">
                    <IoPersonSharp size={30} />
                </div>
                <div className="flex flex-col items-center gap-3">
                    <h1 className="text-black text-3xl font-bold">Create an Account</h1>
                    <p className="text-sm text-zinc-500">Join the BookBarter community today</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <LabeledInput labelName="Full name" placeholder="Enter your fullname" type="text" onChange={(e) => setFullName(e.target.value)} value={fullName} />

                <LabeledInput labelName="Email" placeholder="Enter your email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />

                {/* ✅ Custom City Autocomplete Field */}
                <div className="flex flex-col gap-2 relative">
                    <label className="text-sm font-medium ">City</label>
                    <input
                        type="text"
                        placeholder="Enter your city"
                        value={city}
                        onChange={handleCityChange}
                        className="w-full p-2 py-3 border-[1px] border-zinc-400 rounded-md text-sm font-medium  focus:ring-[2px] focus:ring-blue-500 outline-none transition-all duration-300"
                    />

                    {suggestions.length > 0 && (
                        <ul className="absolute top-full mt-1 z-10 w-full bg-white border rounded-md shadow max-h-40 overflow-y-auto">
                            {suggestions.map((place) => (
                                <li
                                    key={place.place_id}
                                    onClick={() => handleSelectCity(place)}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                    {place.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <LabeledInput labelName="Password" placeholder="Enter your password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <div>
                    <p className="text-sm font-medium text-zinc-600">
                        Already have an account?{" "}
                        <NavLink
                            to={"/login"}
                            className="text-blue-500 hover:text-blue-800 transition-all duration-300 font-bold"
                        >
                            Sign In
                        </NavLink>
                    </p>
                </div>

                <Button variant="primary" text="Create an Account" widthFull={true} onClick={handleRegister} />
            </div>
        </div>
    );
};

export default RegisterPage;
