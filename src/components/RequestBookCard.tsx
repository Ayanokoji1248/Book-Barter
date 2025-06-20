import Badge from "./Badge";
import Button from "./Button";
import type { BookProps } from "./Book";


const RequestBookCard = ({
    photo,
    title,
    genre,
    ownerFullname,
    condition,
    availability,
    price,
    location,
    status,
    clickHandler
}: BookProps) => {
    return (
        <div className="flex sm:flex-row flex-col gap-3 w-full md:w-[70vw] lg:w-[50vw] xl:w-[40vw] md:h-108 h-full items-center shadow-2xl rounded-xl mt-3">
            <div className="w-full h-fit flex justify-center items-center">
                <img className=" h-full object-center object-cover rounded-2xl shadow-2xl shadow-zinc-500" src={photo} alt="" />
            </div>
            <div className="w-full h-fit  p-3 pt-0 flex flex-col gap-2 ">


                <div>
                    <h1 className="text-4xl lg:text-3xl font-bold ">{title}</h1>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex text-md lg:text-sm">
                        <h3 className="font-medium">Request to</h3>: {ownerFullname}
                    </div>
                    <div className="flex text-md lg:text-sm">
                        <h3 className="font-medium">Location</h3>: {location}
                    </div>
                    <div className="flex text-md lg:text-sm">
                        <h3 className="font-medium">Condition</h3>: {condition}
                    </div>
                    <div className="flex text-md lg:text-sm">
                        <h3 className="font-medium">Genre</h3>: {genre}
                    </div>
                    {price &&
                        <div className="flex text-md lg:text-sm">
                            <h3 className="font-medium">Price</h3>: {price}
                        </div>
                    }
                </div>
                <div className="w-full flex items-center gap-2">
                    <h3 className="font-medium text-md lg:text-sm">Status:
                    </h3>
                    <Badge type={status} />
                </div>
                <div className="w-full flex items-center gap-2">
                    <h3 className="font-medium text-md lg:text-sm">Availability:
                    </h3>
                    <Badge type={availability} />
                </div>

                <div className="flex flex-col gap-2  items-center mt-5">
                    <Button text="Cancel Request" variant="danger" widthFull={true} onClick={clickHandler} />
                    <Button text="Chat with Owner" variant="secondary" widthFull={true} />

                </div>
            </div>
        </div>
    );
}

export default RequestBookCard