import { useEffect, useState } from "react";
import RequestRecievedCard from "../components/RequestRecievedCard";
import axios from "axios";
import { BACKEND_URI } from "../utlis";

type RequestCard = {
    _id: string;
    status: "pending" | "accepted" | "rejected";
    message: string;
    requester: {
        fullName: string;
    };
    requestName: string;
    book: {
        title: string;
        photo: string;
        status: string;
        availability: "lend" | "barter" | "buy";
        price: number;
    };
};

const RequestReceived = () => {
    const [allRequests, setAllRequests] = useState<RequestCard[]>([]);

    const requestReceived = async () => {
        try {
            const response = await axios.get(`${BACKEND_URI}/request/recieved`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });

            setAllRequests(response.data.requests);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        requestReceived();
    }, []);

    const updateRequestStatus = (id: string, newStatus: "accepted" | "rejected") => {
        setAllRequests((prev) =>
            prev.map((req) =>
                req._id === id ? { ...req, status: newStatus } : req
            )
        );
    };

    const deleteRequestFromUI = (id: string) => {
        setAllRequests((prev) => prev.filter((req) => req._id !== id));
    };

    const requestComplete = (id: string) => {
        setAllRequests((prev) => prev.filter((req) => req._id !== id))
    }

    return (
        <div className="pb-5 flex flex-wrap gap-8">
            {allRequests.length > 0 ? (
                allRequests.map((req) => (
                    <RequestRecievedCard
                        key={req._id}
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
                        message={req.message}
                        onStatusChange={updateRequestStatus}
                        onDelete={deleteRequestFromUI}
                        onMark={requestComplete}
                    />
                ))
            ) : (
                <p className="font-medium text-sm text-zinc-500">
                    No Request Received.
                </p>
            )}
        </div>
    );
};

export default RequestReceived;
