import { useEffect, useState } from "react";
import RequestRecievedCard from "../components/RequestRecievedCard"
import axios from "axios";
import { BACKEND_URI } from "../utlis";

type RequestCard = {
    _id: string
    status: "pending" | "accepted" | "rejected"
    message: string,
    requester: {
        fullName: string
    }
    requestName: string,
    book: {
        title: string,
        photo: string,
        status: string,
        availability: "lend" | "barter" | "buy",
        price: number,

    }
}

const RequestReceived = () => {
    const [allRequests, setAllRequests] = useState();

    const requestReceived = async () => {
        try {
            const response = await axios.get(`${BACKEND_URI}/request/recieved`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            console.log(response.data)
            setAllRequests(response.data.requests)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        requestReceived()
    },[])
    
    return (
        <div className='pb-5 flex flex-wrap  gap-8'>
            {allRequests ? (
                allRequests.map((req: RequestCard) => (
                    <RequestRecievedCard
                        key={req._id} // Assuming req has a unique `_id` or similar
                        _id={req._id}
                        title={req.book.title}
                        photo={req.book.photo}
                        status={req.status}
                        requesterName={req.requester.fullName}
                        availability={req.book.availability}
                        price={req.book.price}
                        owner={{
                            location: "",
                            fullName: ""
                        }}
                        location=""
                        message=""
                    />
                ))
            ) : (
                <p>No Book</p>
            )}

        </div>
    )
}

export default RequestReceived