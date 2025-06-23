import axios from "axios";
import { BACKEND_URI } from "../utlis";
import Badge from "./Badge";
import Button from "./Button";

export type BookProps = {
    _id: string;
    title: string;
    photo: string;
    message: string;
    requesterName: string;
    availability: "lend" | "barter" | "buy";
    price: number;
    status: "pending" | "accepted" | "rejected";
    onStatusChange: (id: string, newStatus: "accepted" | "rejected") => void;
    onDelete: (id: string) => void;
};

const RequestRecievedCard = ({
    _id,
    photo,
    title,
    message,
    requesterName,
    availability,
    price,
    status,
    onStatusChange,
    onDelete,
}: BookProps) => {
    const acceptRequest = async (_id: string) => {
        try {
            await axios.post(`${BACKEND_URI}/request/${_id}/accept`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            onStatusChange(_id, "accepted");
        } catch (error) {
            console.error(error);
        }
    };

    const rejectRequest = async (_id: string) => {
        try {
            await axios.post(`${BACKEND_URI}/request/${_id}/reject`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            onStatusChange(_id, "rejected");
        } catch (error) {
            console.error(error);
        }
    };

    const deleteRequest = async (_id: string) => {
        try {
            await axios.post(`${BACKEND_URI}/request/${_id}/delete`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            });
            onDelete(_id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="rounded-xl overflow-auto shadow-2xl w-full md:w-96">
            <div id="left" className="w-full sm:h-64 md:h-72 overflow-hidden">
                <img
                    src={photo}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                />
            </div>
            <div className="flex flex-col">
                <div id="right" className="p-2 flex flex-col">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <p className="text-zinc-500">
                        Requested By{" "}
                        <span className="font-medium text-zinc-500">{requesterName}</span>
                    </p>
                    {message && <p className="mb-2">{message}</p>}
                    <div className="flex flex-col gap-2 mt-2">
                        <Badge type={availability} />
                        <div className="flex gap-2 font-medium">
                            Status:
                            <Badge type={status} />
                        </div>
                    </div>
                    {price > 0 && (
                        <div className="mt-1">
                            <p className="font-medium ">Price: ${price}</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-3 p-3">
                    {status === "accepted" ? (
                        <Button variant="success" text="Mark as Complete" widthFull={true} />
                    ) : status === "rejected" ? (
                        <Button
                            variant="danger"
                            text="Deleted Request"
                            widthFull={true}
                            onClick={() => deleteRequest(_id)}
                        />
                    ) : (
                        <div className="flex gap-3">
                            <Button
                                variant="success"
                                text="Accept"
                                widthFull={true}
                                onClick={() => acceptRequest(_id)}
                            />
                            <Button
                                variant="danger"
                                text="Reject"
                                widthFull={true}
                                onClick={() => rejectRequest(_id)}
                            />
                        </div>
                    )}

                    <Button text="Chat" variant="secondary" widthFull={true} />
                </div>
            </div>
        </div>
    );
};

export default RequestRecievedCard;
