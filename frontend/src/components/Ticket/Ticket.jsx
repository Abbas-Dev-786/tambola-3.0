import { useState } from "react";
import "./Ticket.css";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../spinner";
import { fetchTicket } from "../../api";

function Ticket() {
  const [getTicket, setGetTicket] = useState([]); //get values for ticket
  const [animate, setAnimate] = useState(false);
  const user_id = JSON.parse(localStorage.getItem("user"))?.user?.id; //get user id

  //change the background of block of ticket when clicked
  const handleClick = (event) => {
    if (event.currentTarget.textContent) {
      event.currentTarget.classList.add("striked");
    }
  };
  const { isLoading, data, error, isError } = useQuery({
    queryKey: "tickets",
    queryFn: async () => {
      const res = await fetchTicket();
      if (res.status === "success") {
        setGetTicket(res?.data?.answers);
      }
      return res;
    },
  });
  if (isError) {
    toast.error(error?.message);
  }

  return (
    <div>
      <div className="board">
        <Toaster position="bottom-center" />

        {isLoading && (
          <div style={{ marginTop: "20px" }}>
            <Loader />
          </div>
        )}
        <div className="tambola-ticket">
          {/* display array of answers inside getTicket state */}
          {getTicket?.map((ticket, i) => (
            <div
              key={i}
              className={"tambola-ticket-cell "}
              onClick={handleClick}
            >
              <h5>{ticket}</h5>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ticket;
