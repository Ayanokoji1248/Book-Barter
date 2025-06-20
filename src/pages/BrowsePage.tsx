import { FiFilter } from "react-icons/fi";
import Book, { type BookProps } from "../components/Book";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../utlis";


const BrowsePage = () => {
    const [books, setBooks] = useState<BookProps[]>([]);

    const getBooks = async () => {
        try {
            const response = await axios.get(`${BACKEND_URI}/book`);
            setBooks(response.data.books.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBooks();
    }, []);

    return (
        <div className="max-w-7xl mx-auto pt-24 flex flex-col gap-5">
            <div className="bg-zinc-100 px-5 py-3 flex flex-col gap-3 rounded-md">
                {/* Filter Header */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                        <FiFilter size={20} className="text-zinc-700" />
                        <h1 className="text-2xl font-bold text-zinc-700">Filter</h1>
                    </div>
                    <button className="text-sm font-bold text-zinc-500 cursor-pointer hover:text-zinc-800 transition-all duration-300">
                        Clear All
                    </button>
                </div>

                {/* Filter Options */}
                <div className="flex flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        placeholder="🔍 Search Books"
                        className="border-zinc-400 border p-2 rounded-xl outline-none md:w-1/5"
                    />
                    <select className="border-zinc-400 border p-2 rounded-xl outline-none md:w-1/5">
                        <option value="fantasy">Fantasy</option>
                        <option value="game">Game</option>
                        <option value="adventure">Adventure</option>
                    </select>
                    <select className="border-zinc-400 border p-2 rounded-xl outline-none md:w-1/5">
                        <option value="donate">Donate</option>
                        <option value="lend">Lend</option>
                        <option value="barter">Barter</option>
                    </select>
                    <select className="border-zinc-400 border p-2 rounded-xl outline-none md:w-1/5">
                        <option value="good">Good</option>
                        <option value="bad">Bad</option>
                        <option value="fair">Fair</option>
                    </select>
                    <input
                        type="text"
                        placeholder="City"
                        className="border-zinc-400 border p-2 rounded-xl outline-none md:w-1/5"
                    />
                </div>
            </div>

            {/* Masonry Grid */}
            <div className="flex flex-wrap gap-10 justify-center pb-5">
                {books.length > 0 ? (


                    books.map((book) => (
                        <Book
                            key={book._id}
                            _id={book._id}
                            photo={book.photo}
                            title={book.title}
                            author={book.author}
                            availability={book.availability}
                            location={book.owner.location}
                            description={book.description}
                            price={book.price}
                            owner={book.owner}
                            isOwner={false}
                        />
                    ))


                ) : (
                    <div>
                        <p className="text-sm text-zinc-400 font-semibold opacity-60">
                            No Book Added Yet.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowsePage;
