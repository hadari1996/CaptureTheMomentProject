import axios from "axios";
import React, { useEffect, useState } from "react";
import theme from "../colors/color";
import { ThemeProvider } from "styled-components";
import EventCard from "./EventCard";
import { Event } from "../features/events/eventModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Box, CircularProgress, Grid } from "@mui/material";

function ClosedEvents() {
  const [closedEvents, setclosedEvents] = useState<Event[]>([]);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);

  const getAllClosedDates = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/api/v1/events/closed-dates`);
      setIsLoading(false);
      const { closedDatesEvent, status } = data;
      setclosedEvents(closedDatesEvent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllClosedDates();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            height: "20%",
            width: "100%",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : closedEvents.length > 0 ? (
        <Grid
          container
          gridTemplateColumns={3}
          gap={"30px"}
          sx={{
            overflowY: "scroll",
            height: "80vh",
            padding: "30px",
            width: "75vw",
            justifyContent: "center",
          }}
        >
          <ThemeProvider theme={theme}>
            {closedEvents!.map((ev: Event, idx) => {
              return <EventCard key={idx} eventDate={ev} />;
            })}
          </ThemeProvider>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10vh",
          }}
        >
          <h1>No open events found</h1>
        </Box>
      )}
    </>
  );
}

export default ClosedEvents;
