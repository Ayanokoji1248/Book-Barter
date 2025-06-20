import { NavLink, useParams } from "react-router-dom"
import axios from "axios";
import { BACKEND_URI } from "../utlis";
import { useEffect, useState } from "react";
import BookInfoCard from "../components/BookInfoCard";
import type { BookProps } from "../components/Book";
import { IoMdArrowBack } from "react-icons/io";


const BookPage = () => {

    const { id } = useParams();
    const [book, setBook] = useState<BookProps>();



    useEffect(() => {
        const getBook = async () => {
            try {
                const response = await axios.get(`${BACKEND_URI}/book/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                })

                console.log(response.data)
                setBook(response.data.book)

            } catch (error) {
                console.log(error)
            }

        }
        if (id) getBook()
    }, [id]);

    return (
        <div className="pt-24 max-w-7xl mx-auto">
            <div className="px-12">
                <NavLink to={'/browse'} className="text-sm text-blue-600 font-medium flex items-center gap-2 hover:text-blue-700 transition-all duration-300"><IoMdArrowBack size={20} />Back to Browse</NavLink>
            </div>

            {book &&

                <BookInfoCard
                    _id={book._id}
                    photo={book.photo}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    ownerFullname={book.owner?.fullName}
                    condition={book.condition}
                    price={book.price}
                    location={book.owner?.location}
                    description={book.description}
                    availability={book.availability}
                    isOwner={false}
                    owner={book.owner}
                />
            }
        </div>

    )
}

export default BookPage