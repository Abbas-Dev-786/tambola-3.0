import { useState, useEffect } from "react";
import axios from "axios";
import "./Ticket.css";
import { useQuery } from "@tanstack/react-query";
import { fetchTicket } from "../../lib/actions";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../../lib/spinner";

function Ticket() {
  const [getTicket, setGetTicket] = useState([]); //get values for ticket
  const user_id = JSON.parse(localStorage.getItem("user"))?.id; //get user id
  const { error, isLoading } = useQuery({
    queryKey: ["ticket", user_id],
    queryFn: async () => {
      const res = await fetchTicket(user_id);
      const data = await res.json();
      if (!res?.ok) {
        toast.error(data);
        throw new Error(data);
      }
      setGetTicket(data?.ticket);
      return data;
    },
  });

  //change the background of block of ticket when clicked
  const handleClick = (event) => {
    if (event.currentTarget.textContent) {
      event.currentTarget.classList.add("striked");
    }
  };

  //response if ticket is not generated
  if (!getTicket) return <h3>Ticket not generated...</h3>;
  if (error) return <h3>{error}</h3>;

  //response until ticket is fetched
  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="board">
        <Toaster position="bottom-center" />
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
