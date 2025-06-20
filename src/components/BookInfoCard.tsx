
import Button from './Button'
import Badge from './Badge'
import type { BookProps } from './Book'
import { BACKEND_URI } from '../utlis'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

const BookInfoCard = ({ photo, title, author, genre, condition, availability, price, description, location, ownerFullname, _id

}: BookProps) => {


    const requestBook = async () => {
        try {
            const response = await axios.post(`${BACKEND_URI}/request/${_id}`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })

            console.log(response.data)
            toast.success("Request Made Successfull")

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
            else {
                toast.error("Unexpected Error")
            }
        }
    }
    return (
        <div className=" p-5 flex md:flex-row flex-col gap-2 pt-10">
            <div className="w-full md:w-[50%]  flex justify-center">
                <img className=" h-[70vh] object-center object-cover rounded-2xl shadow-2xl shadow-zinc-500" src={photo} alt="" />
            </div>
            <div className="w-full h-fit md:w-[50%] p-5 flex flex-col gap-3 ">
                <div className="w-full">
                    <Badge type={availability} />
                </div>

                <div>
                    <h1 className="text-4xl font-bold lg:text-6xl md:text-5xl">{title}</h1>
                    <p className="text-xl">{author}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="flex">
                        <h3 className="font-medium">Owner</h3>: {ownerFullname}
                    </div>
                    <div className="flex">
                        <h3 className="font-medium">Location</h3>: {location}
                    </div>
                    <div className="flex">
                        <h3 className="font-medium">Condition</h3>: {condition}
                    </div>
                    <div className="flex">
                        <h3 className="font-medium">Genre</h3>: {genre}
                    </div>

                    {price &&
                        <div className="flex">
                            {/* Optional Price only see when badge is price */}
                            <h3 className="font-medium">Price</h3>: ${price}
                        </div>
                    }
                </div>

                <div className='flex gap-2'>
                    <h3 className='font-medium'>Description:</h3>
                    <p className="text-zinc-600 font-medium">{description}</p>
                </div>

                <div className="flex flex-col gap-2 sm:flex sm:flex-row sm:gap-3 items-center mt-2">
                    <Button text="Request the Book" variant="primary" widthFull={true} onClick={requestBook} />
                    <Button text="Chat with Owner" variant="secondary" widthFull={true} />

                </div>
            </div>
            <ToastContainer position={"bottom-right"} />
        </div>
    )
}

export default BookInfoCard