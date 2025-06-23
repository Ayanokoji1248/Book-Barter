import { TfiLocationPin } from "react-icons/tfi"
import Badge from "./Badge"
import Button from "./Button"
import { useNavigate } from "react-router-dom"

export interface BookProps {
    _id?: string
    photo: string,
    title: string,
    author?: string,
    genre?: string,
    owner: {
        location: string,
        fullName: string,
    },
    ownerFullname?: string,
    condition?: string,
    availability: "lend" | "barter" | "buy",
    price?: number,
    description?: string,
    isOwner?: boolean,
    location: string,
    status: "pending" | "accepted" | "rejected",
    message: string,
    requesterName: string,
    clickHandler?: () => void,
}

const Book = ({
    _id,
    photo,
    title,
    author,
    availability,
    price,
    location,
    description,
    clickHandler,
    isOwner,

}: BookProps) => {
    const navigate = useNavigate()
    return (
        <div className="shadow-2xl w-full rounded-xl overflow-hidden md:w-96 bg-white">
            {/* Image Container with fixed height */}
            <div className="w-full sm:h-64 md:h-72 overflow-hidden">
                <img
                    src={photo}
                    alt={title}
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Book Details */}
            <div className="p-4 py-3 pt-2 flex flex-col gap-2">
                <div className="flex justify-between">
                    <Badge type={availability} />
                    {price > 0 && "$"+price}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold line-clamp-1">{title}</h1>
                    <p className="text-md text-zinc-800 line-clamp-1">by {author}</p>
                    <p className="text-zinc-600 flex items-center gap-1 my-2 text-sm">
                        <TfiLocationPin size={18} />
                        {location ? location.substring(0, 15) + "..." : "Unknown"}
                    </p>
                    <p className="text-zinc-600 text-sm leading-tight mb-2 line-clamp-3">{description}</p>
                </div>

                {isOwner ? (
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" text="Edit" widthFull={true} />
                        <Button variant="danger" text="Remove" widthFull={true} onClick={clickHandler} />
                    </div>
                ) : (
                    <Button variant="primary" text="View Details" widthFull={true} onClick={() => navigate(`/book/${_id}`)} />
                )}
            </div>
        </div>
    )
}

export default Book;
