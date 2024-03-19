import { Box, useTheme, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { getRandomQuestion } from "../api";

const Question = () => {
  const theme = useTheme();

  const { mutate, data, isPending } = useMutation({
    mutationFn: getRandomQuestion,
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Question" subTitle="Get the new Questions" />

        <Button
          disableFocusRipple
          sx={{
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.background.alt,
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
              color: theme.palette.background.alt,
            },
          }}
          onClick={() => mutate()}
        >
          Get Question
        </Button>
      </FlexBetween>

      <Box
        mt="40px"
        height="75vh"
        bgcolor={theme.palette.grey[800]}
        borderRadius="50px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        overflow="auto"
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
        {data?.type == "text" && (
          <Typography
            variant="h1"
            fontSize={60}
            className="question-style"
            // lineHeight="100px"
            // sx={{ whiteSpace: "pre-wrap" }}
          >
            {isPending ? "Loading..." : data?.question}
          </Typography>
        )}

        {data?.type == "img" && (
          <img
            src={data?.question}
            alt="code-snippet"
            style={{
              height: "90%",
              width: "70%",
              objectFit: "fill",
              objectPosition: "center",
            }}
          />
        )}

        {!data?.question && !isPending && (
          <Typography variant="h2">Waiting for the Question</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Question;
