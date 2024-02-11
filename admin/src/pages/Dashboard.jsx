import { useMemo } from "react";
import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import { raiseHandColumns } from "../columns";
import FlexBetween from "../components/FlexBetween";
import { getAllRaiseHands } from "../api";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["hands"],
    queryFn: getAllRaiseHands,
  });

  const actionFieldColumn = useMemo(
    () => [
      {
        field: "ticket",
        headerName: "View Ticket",
        flex: 0.3,
        renderCell: (params) => {
          const onClick = () => {
            navigate(`/ticket/${params?.row?.user?.id}`);
          };

          return (
            <Button
              variant="outlined"
              color="secondary"
              // size="small"
              sx={{ px: 7 }}
              onClick={onClick}
            >
              View Ticket
            </Button>
          );
        },
      },
    ],
    [navigate]
  );

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header
          title="PLAYERS"
          subTitle="List of players who have completed some schemes"
        />
      </FlexBetween>

      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={[...raiseHandColumns, ...actionFieldColumn]}
          rowCount={data?.length || 0}
          pagination
          pageSizeOptions={[10, 20, 40, 60, 80, 100]}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
