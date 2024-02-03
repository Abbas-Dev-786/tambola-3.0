import { useState, useEffect } from "react";
import axios from "axios";
import "./Ticket.css";

const data = [
  "earning from rewards",
  null,
  null,
  "Version-control",
  "Java or Kotlin",
  null,
  "Digital currency",
  "JetBrains",
  null,
  "Decentralized application.",
  "void main()",
  null,
  "ID",
  "Oculus, Vive",
  null,
  null,
  "Portability",
  null,
  "Fields",
  "Prim's Algorithm",
  "Text",
  null,
  null,
  "Unit of data",
  null,
  "HTML",
  null,
];

function Ticket() {
  const [getTicket, setGetTicket] = useState([]); //get values for ticket
  const user_id = JSON.parse(localStorage.getItem("user"))?.id; //get user id

  //get values inside ticket once render to route
  useEffect(() => {
    setGetTicket(data);
    // async function fetchTicket() {
    //   //get array of answers from db
    //   //   const URL = "https://tambola-backend.vercel.app/ticket";
    //   const URL = "http://127.0.0.1:5000/ticket";
    //   try {
    //     const res = await axios.post(URL, {
    //       data: { id: user_id },
    //     });
    //     // store answers in getTicket state
    //     setGetTicket(res.data["answers"]);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // //function calling
    // fetchTicket();
  }, [user_id]);

  //change the background of block of ticket when clicked
  const handleClick = (event) => {
    if (event.currentTarget.textContent) {
      event.currentTarget.classList.add("striked");
    }
  };

  //response if ticket is not generated
  if (getTicket === undefined) return <h3>Ticket not generated...</h3>;

  //response until ticket is fetched
  if (!getTicket.length) return <h3>Loading...</h3>;

  return (
    <div>
      <div className="board">
        <div className="tambola-ticket">
          {/* display array of answers inside getTicket state */}
          {getTicket.map((ticket, i) => (
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
