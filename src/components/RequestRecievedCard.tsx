
import axios from "axios"
import { BACKEND_URI } from "../utlis"
import Badge from "./Badge"
import type { BookProps } from "./Book"
import Button from "./Button"



const RequestRecievedCard = ({ _id, photo, title, message, requesterName, availability, price, status }: BookProps) => {

    const acceptRequest = async (_id: string) => {
        const response = await axios.post(`${BACKEND_URI}/request/${_id}/accept`, {}, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        console.log(response.data)
    }
    // console.log(localStorage.getItem("token"))

    const rejectRequest = async (_id: string) => {
        const response = await axios.post(`${BACKEND_URI}/request/${_id}/reject`, {}, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })

        console.log(response.data)
    }

    return (
        <div className="rounded-xl overflow-auto shadow-2xl w-full md:w-96">
            <div id="left" className="w-full sm:h-64 md:h-72 overflow-hidden">
                <img src={photo} alt="" className="w-full h-full object-cover object-center" />
            </div>
            <div id="right" className="p-2 flex flex-col gap-5">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-zinc-500">Requested By <span className="font-medium text-zinc-500">{requesterName}</span></p>
                    {message &&
                        <p className="mb-2">{message}</p>
                    }
                    <div className="flex flex-col gap-2 mt-2">
                        <Badge type={availability} />
                        <div className="flex gap-2 font-medium">
                            Status:
                            <Badge type={status} />
                        </div>
                    </div>
                    <div className="mt-1">
                        <p className="font-medium ">Price: ${price}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {status === "accepted" ? <Button variant="success" text="Mark as Complete" widthFull={true} /> :
                        <div className="flex justify-between gap-2">

                            <Button variant="success" text="Accept" widthFull={true} onClick={() => acceptRequest(_id)} />
                            <Button variant="danger" text="Decline" widthFull={true} onClick={() => rejectRequest(_id)} />
                        </div>
                    }
                    <Button text="Chat" variant="secondary" widthFull={true} />
                </div>
            </div>
        </div>
    )
}

export default RequestRecievedCard