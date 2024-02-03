import "./Ticket.css";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader } from "../spinner";
import { fetchTicket } from "../../api";

function Ticket() {
  // const [animate, setAnimate] = useState(false);

  //change the background of block of ticket when clicked
  const handleClick = (event) => {
    if (event.currentTarget.textContent) {
      event.currentTarget.classList.add("striked");
    }
  };

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTicket,
  });

  if (isError) {
    toast.error(error?.message);
  }

  return (
    <div>
      <div className="board">
        {isLoading && (
          <div style={{ marginTop: "20px" }}>
            <Loader />
          </div>
        )}
        <div className="tambola-ticket">
          {/* display array of answers inside getTicket state */}
          {data?.map((ticket, i) => (
            <div
              key={i}
              className={`tambola-ticket-cell ${ticket ? "hover" : ""}`}
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
