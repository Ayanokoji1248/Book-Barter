import { useEffect, useState } from "react"
import Book, { type BookProps } from "../components/Book"
import { BACKEND_URI } from "../utlis";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

type User = {
  fullName: string,
  email: string,
  location: string
}

const ProfilePage = () => {

  const navigate = useNavigate();

  const [books, setBooks] = useState<BookProps[]>([]);

  const [user, setUser] = useState<User>()

  async function getUser() {
    try {
      const response = await axios.get(`${BACKEND_URI}/user/me`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      })
      console.log(response.data)
      setUser(response.data)
      // console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  async function getUserBooks() {
    try {
      const response = await axios.get(`${BACKEND_URI}/book/me/books`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      console.log(response.data)
      setBooks(response.data.book)
    } catch (error) {
      console.error(error)
    }
  }

  async function removeBook(id: string) {
    try {
      const response = await axios.delete(`${BACKEND_URI}/book/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      })

      const tempBooks = books.filter((book) => book._id !== id)

      console.log(response.data)
      setBooks(tempBooks)

    } catch (error) {
      console.error(error)
      toast.error("Error while deleting")
    }
  }

  useEffect(() => {
    getUserBooks();
    getUser()
  }, [])



  return (
    <div className="pt-24 pb-6 max-w-7xl mx-auto px-5 flex flex-col gap-6">
      <div className="flex flex-col items-center">
        {user ? (
          <div className="flex flex-col items-center">

            <div className="w-20 h-20 bg-amber-200 rounded-full"></div>
            <h1 className="text-2xl font-bold">{user.fullName}</h1>
            <p className="text-sm text-zinc-600 font-semibold">{user.email}</p>
            <p className="text-sm text-zinc-500 text-center">{user.location}</p>
          </div>

        ) : (
          <p className="text-zinc-500 text-sm">Loading profile...</p>
        )}

      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold pl-2 border-l-6 border-blue-600">MyBooks</h1>
        <Button variant="primary" text="Add Book" onClick={() => navigate('/add')} />
      </div>

      <div className="flex flex-wrap gap-8 items-center justify-center">
        {books.length > 0 ?
          books.map((book) => (
            <Book
              key={book._id}
              photo={book.photo}
              title={book.title}
              author={book.author}
              availability={book.availability}
              location={book.owner.location}
              description={book.description}
              price={book.price}
              owner={book.owner}
              isOwner={true}
              clickHandler={() => removeBook(book._id)} />
          ))
          :
          <div><p className="text-sm text-zinc-400 font-semibold opacity-60">No Book Added Yet.</p></div>}
      </div>
      <ToastContainer position={"bottom-right"} />
    </div>
  )
}

export default ProfilePage