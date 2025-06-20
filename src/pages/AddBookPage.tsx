import { useState, type ChangeEvent } from "react"
import Button from "../components/Button"
import LabeledInput from "../components/LabeledInput"
import { toast, ToastContainer } from "react-toastify";
import { uploadImage } from "../utils/uploadImage";
import axios from "axios";
import { BACKEND_URI } from "../utlis";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState<string>();
    const [author, setAuthor] = useState<string>();
    const [genre, setGenre] = useState<string>("");
    const [condition, setCondition] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [price, setPrice] = useState<number | undefined>(0)
    const [description, setDescription] = useState<string>()
    const [file, setFile] = useState<File | undefined>()

    const genreArr = ["Fiction", "Non-Fiction", "Mystery", "Romance", "Sci-fi", "Biography"]
    const conditionArr = ["New", "Good", "Fair", "Poor"]
    const typeArr = ["Lend", "Barter", "Buy"]


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            return toast.error("Please select an image")
        }

        try {
            const imageUrl = await uploadImage(file)

            const response = await axios.post(`${BACKEND_URI}/book`, {
                title,
                author,
                genre,
                condition,
                availability: type,
                price,
                description,
                photo: imageUrl,
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            // console.log(response.data)


            setTitle("")
            setAuthor("")
            setGenre("")
            setCondition("")
            setType("")
            setPrice(undefined)
            setDescription("")
            setFile(undefined)

            setTimeout(() => {
                toast.success("Book Added Successfull")
                navigate('/browse')
            }, 1500)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }

    }

    return (
        <div className="pt-24 pb-10 max-w-7xl mx-auto px-5 flex flex-col gap-8">

            <div>
                <h1 className="text-2xl font-bold px-2 border-l-8 border-blue-500">Add Book</h1>
            </div>

            <div className="flex flex-col gap-5 md:w-1/2 md:mx-auto">
                <div id="first" className="flex flex-col gap-5 md:flex-row">
                    <div className="flex flex-col md:w-1/2">
                        <LabeledInput labelName="Book Title *" placeholder="Enter book title" type="text" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                    </div>
                    <div className="flex flex-col md:w-1/2">
                        <LabeledInput labelName="Author Name *" placeholder="Enter author name" type="text" value={author} onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)} />
                    </div>
                </div>


                <div id="second" className="flex flex-col gap-5 md:flex-row ">
                    <div className="flex flex-col md:w-1/3">
                        <label htmlFor="genre" className="text-sm  font-medium">Genre</label>
                        <select name="genre" id="genre" className="outline-none border-[1px] p-2 rounded-md border-zinc-500 text-sm font-medium text-zinc-600" value={genre} onChange={(e: ChangeEvent<HTMLSelectElement>) => setGenre(e.target.value)} >
                            <option value="" disabled hidden>
                                Select Genre
                            </option>
                            {genreArr.map(genre => (
                                <option value={genre.toLowerCase()}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col md:w-1/3">
                        <label className="text-sm  font-medium">Condition</label>
                        <select name="condition" id="condition" value={condition} className="outline-none border-[1px] p-2 rounded-md border-zinc-500 text-sm font-medium text-zinc-600" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCondition(e.target.value)}>
                            <option value="" disabled hidden>Select Condition</option>
                            {conditionArr.map(condition => (
                                <option value={condition.toLowerCase()}>{condition}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col md:w-1/3">
                        <label className="text-sm  font-medium">Availability Type</label>
                        <select name="type" id="type" value={type} className="outline-none border-[1px] p-2 rounded-md border-zinc-500 text-sm font-medium text-zinc-600" onChange={(e: ChangeEvent<HTMLSelectElement>) => setType(e.target.value)}>
                            <option value="" disabled hidden>Select Availability Type</option>
                            {typeArr.map(type => (
                                <option value={type.toLowerCase()}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {type === "buy" &&
                        <div className="flex flex-col">
                            <LabeledInput labelName="Price" placeholder="Enter price"
                                min={0} type="number" value={String(price)} onChange={(e: ChangeEvent<HTMLInputElement>) => setPrice(Number(e.target.value))} />
                        </div>
                    }
                    <div className="flex flex-col">
                        <LabeledInput labelName="Book Image" placeholder="Enter city or state" type="file" onChange={(e) => {
                            const image = e.target.files?.[0]
                            if (image) {
                                setFile(image)
                            }
                        }} />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="text-sm  font-medium">Description</label>
                        <textarea name="description" id="description" className="border-[1px] border-zinc-500  rounded-md focus:ring-2 ring-blue-500 outline-none transition-all duration-300 p-2 text-sm font-medium h-42" placeholder="Describe the book condition, any notes, or special requirements..."  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}></textarea>
                    </div>
                </div>


                <Button variant="primary" text="Add Book" widthFull={true} onClick={handleSubmit} />
            </div>
            <ToastContainer position={"bottom-right"} />
        </div>
    )
}

export default AddBookPage