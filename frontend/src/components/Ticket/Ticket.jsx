import { useState, useEffect } from "react";
import axios from "axios";
import "./Ticket.css";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import { Loader } from "../spinner";
import { fetchTicket } from "../../api";

function Ticket() {
  const [getTicket, setGetTicket] = useState([]); //get values for ticket
  const user_id = JSON.parse(localStorage.getItem("user"))?.user?.id; //get user id

  const { data, error, isLoading } = useQuery({
    queryKey: ["ticket"],
    queryFn: async () => {
      const res = await fetchTicket();
      console.log(res);
      return res;
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
  if (error) return <h3>{error?.message}</h3>;

  //response until ticket is fetched

  return (
    <div>
      <div className="board">
        <Toaster position="bottom-center" />
        {isLoading && <Loader />}
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
