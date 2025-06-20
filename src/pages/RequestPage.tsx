import { NavLink, Outlet } from "react-router-dom"


export const RequestPage = () => {
    return (
        <div className="max-w-7xl pt-24 px-5 mx-auto flex flex-col gap-5">
            <div>
                <h1 className="text-2xl font-bold border-l-8 pl-2 border-blue-500 ">Book Request</h1>
            </div>

            <div className="flex gap-5">
                <NavLink to={"/requests/received"} className="p-2 border-[1px] rounded-md text-sm text-blue-500 font-medium">Request Received</NavLink>
                <NavLink to={"/requests/made"} className="p-2 border-[1px] rounded-md text-sm text-blue-500 font-medium">Request Made</NavLink>
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    )
}
