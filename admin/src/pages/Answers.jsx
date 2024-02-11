import {
  Box,
  useTheme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FlexBetween from "../components/FlexBetween";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllAnswers, getAllQuestions } from "../api";
const Answers = () => {
  const theme = useTheme();
  const { data: answers } = useQuery({
    queryKey: ["answers"],
    queryFn: () => getAllAnswers(),
  });
  const { data: questions, isLoading } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getAllQuestions(),
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
        {isLoading
          ? "Loading..."
          : questions.map((e, i) => {
              return (
                <Accordion key={i} sx={{ bgcolor: theme.palette.grey[800] }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {e}
                  </AccordionSummary>
                  <AccordionDetails>{answers[i]}</AccordionDetails>
                </Accordion>
              );
              // });
            })}
      </Box>
    </Box>
  );
};

export default Answers;