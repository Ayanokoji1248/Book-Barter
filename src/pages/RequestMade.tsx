import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URI } from "../utlis";
import RequestBookCard from "../components/RequestBookCard";
import { toast, ToastContainer } from "react-toastify";


const RequestMade = () => {

  const [requestMade, setRequestMade] = useState<[]>();

  const allRequestMade = async () => {
    try {
      const response = await axios.get(`${BACKEND_URI}/request/sent`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      // console.log(response.data.request)
      setRequestMade(response.data.request)
    } catch (error) {
      console.log(error)
    }
  }

  const requestReject = async (id: string) => {
    try {
      const response = await axios.delete(`${BACKEND_URI}/request/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })

      const tempReqArr = requestMade?.filter((req) => {
        if (req._id === id) {
          return
        }
        return req
      });

      toast.success("Request Cancelled")
      setRequestMade(tempReqArr)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allRequestMade()
  }, [])

  return (
    <div className="w-full h-full">

      <div className="flex flex-wrap justify-between pb-5">
        {requestMade?.length > 0 ? requestMade?.map((request) => (
          <RequestBookCard
            key={request._id}
            photo={request.book.photo}
            title={request.book.title}
            genre={request.book.genre}
            ownerFullname={request.reciever.fullName}
            condition={request.book.condition}
            availability={request.book.availability}
            price={request.book.price}
            status={request.status}
            location={request.reciever.location}
            owner={request.reciever}
            clickHandler={() => requestReject(request._id)}
          />
        )) : <div className="font-medium text-sm text-zinc-400">No Request Made.</div>}

      </div>

      <ToastContainer position="bottom-right" />
    </div>
  )
}

export default RequestMade