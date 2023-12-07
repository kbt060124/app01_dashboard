import { Box } from "@mui/material";
import Header from "../../components/Header";
import GitCalendar from "../../components/GitCalendar";

const Calendar = () => {
  return (
    <Box m="20px">
      <Header title="Git Calender" subtitle="Lile Git Calender" />
      <Box height="75vh">
        <GitCalendar />
      </Box>
    </Box>
  );
};

export default Calendar;
