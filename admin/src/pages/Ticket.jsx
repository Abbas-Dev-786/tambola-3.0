import "./ticket.css";
import { Typography, Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUserTicket } from "../api";
import { useParams } from "react-router-dom";

function Ticket() {
  const params = useParams();

  const { isLoading, data, error, isError } = useQuery({
    queryKey: ["tickets", params?.id],
    queryFn: getUserTicket,
    enabled: Boolean(params?.id),
  });

  if (isError) {
    toast.error(error?.message);
  }

  return (
    <Box m={10}>
      <div className="board">
        <div className="tambola-ticket">
          {isLoading && (
            <Typography
              variant="body1"
              display="flex"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
            >
              Loading...
            </Typography>
          )}
          {/* display array of answers inside getTicket state */}
          {data &&
            data?.map((ticket, i) => (
              <div key={`ticket-${i}`} className={`tambola-ticket-cell`}>
                <h5 className="text-wrap">{ticket}</h5>
              </div>
            ))}
        </div>
      </div>
    </Box>
  );
}

export default Ticket;
