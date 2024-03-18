import { Box, useTheme } from "@mui/material";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllAskedQnA } from "../api";
import { answerColumns } from "../columns";
import { DataGrid } from "@mui/x-data-grid";

const Answers = () => {
  const theme = useTheme();

  const { data, isLoading } = useQuery({
    queryKey: ["asked-qna"],
    queryFn: getAllAskedQnA,
  });

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="ANSWERS" subTitle="Get Answers of all the Questions" />
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
          columns={answerColumns}
          rowCount={data?.length || 0}
          pagination
          pageSizeOptions={[10, 20, 40, 60, 80, 100]}
        />
      </Box>
    </Box>
  );
};

export default Answers;
