import "./Ticket.css";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Loader } from "../spinner";
import { fetchTicket } from "../../api";
import ButtonContainer from "./ButtonContainer";
import { convertArrayToObject } from "../../utils/arrayToObj";
import { useEffect, useState } from "react";

function Ticket() {
  const [ticketData, setTicketData] = useState(false);

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tickets"],
    queryFn: fetchTicket,
  });

  if (isError) {
    toast.error(error?.message);
  }

  useEffect(() => {
    setTicketData(data ? convertArrayToObject(data) : data);
  }, [data]);

  return (
    <div className="container">
      <ButtonContainer data={ticketData ? ticketData : []} />
      <div className="row">
        <div className="board">
          <div className="tambola-ticket">
            {isLoading && (
              <div className="d-flex align-items-center justify-content-center">
                <Loader />
              </div>
            )}
            {/* display array of answers inside getTicket state */}
            {ticketData &&
              ticketData?.map((ticket, i) => (
                <div
                  key={`ticket-${i}`}
                  className={`tambola-ticket-cell ${
                    ticket.key ? "hover" : ""
                  } ${ticket.isChecked && ticket.key != null ? "striked" : ""}`}
                  onClick={() => {
                    setTicketData((prevObjects) =>
                      prevObjects.map((prevObj) =>
                        prevObj?.key === ticket?.key
                          ? { ...prevObj, isChecked: !prevObj.isChecked }
                          : prevObj
                      )
                    );
                  }}
                >
                  <h5 className="text-wrap">{ticket.key}</h5>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
