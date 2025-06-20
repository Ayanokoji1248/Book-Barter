import { FiBookOpen } from "react-icons/fi";
import { GoPeople } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";

import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const AuthLayout = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row xl:flex-row">
            <div className="w-full justify-center h-fit lg:h-screen bg-gradient-to-b from-[#62CFF4] to-[#2D69F1] p-5 md:p-10 lg:p-15 xl:p-24 flex flex-col gap-6">
                <div>
                    <Logo />
                </div>

                <div className="flex flex-col gap-6">
                    <h1 className="text-5xl md:text-3xl lg:text-4xl xl:text-6xl text-white font-bold leading-none">
                        Start your book sharing adventure
                    </h1>
                    <p className="text-md font-medium text-white  leading-tight">
                        Join thousands of book lovers who are sharing, discovering, and
                        connecting through the power of books. Create your account and
                        become part of our growing community.
                    </p>
                </div>

                <div className="flex justify-center items-center flex-wrap gap-10 mt-3">
                    <div className="flex flex-col items-center w-fit p-5 rounded-2xl bg-white gap-2">
                        <div className="p-2 bg-blue-200 rounded-xl">
                            <FiBookOpen size={28} className="text-blue-500" />
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-black text-lg font-bold">Share Books</h1>
                            <p className="text-sm text-zinc-700">List your collection</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit p-5 rounded-2xl bg-white gap-2">
                        <div className="p-2 bg-violet-200 rounded-xl">
                            <GoPeople size={28} className="text-violet-500" />
                        </div>
                        <div className="flex flex-col items-center">
                            <h1 className="text-black text-lg font-bold">Connect</h1>
                            <p className="text-sm text-zinc-800">List your collection</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-fit p-5 rounded-2xl bg-white gap-2">
                        <div className="p-2 bg-green-200 rounded-xl">
                            <IoMdHeartEmpty size={28} className="text-green-500" />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-black text-lg font-bold">Share Books</h1>
                            <p className="text-sm text-zinc-800">List your collection</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit lg:h-screen bg-white flex justify-center items-center">
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
