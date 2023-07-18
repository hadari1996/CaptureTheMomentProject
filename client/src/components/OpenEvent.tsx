import axios from "axios";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "../colors/color";
import EventCard from "./EventCard";
import { Event } from "../features/events/eventModel";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { Box, CircularProgress, Container, Grid } from "@mui/material";

export const OpenEvent = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [openEvents, setOpenEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllOpenDates = async () => {
    const { data } = await axios.get(`/api/v1/events/open-dates`);
    setIsLoading(false);
    const { openDatesEvent, status } = data;
    setOpenEvents(openDatesEvent);
  };

  
  useEffect(() => {
    getAllOpenDates();
    setIsLoading(true);
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
      ) : openEvents ? (
        <ThemeProvider theme={theme}>
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
            {openEvents!.map((ev: Event, idx) => {
              return (
                <EventCard
                  key={idx}
                  eventDate={ev}
                  openEvents={openEvents}
                  setOpenEvents={setOpenEvents}
                  getDates={getAllOpenDates}
                />
              );
            })}
          </Grid>
        </ThemeProvider>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
            marginTop: "10vh",
          }}
        >
          <h1>No open events found</h1>
        </Box>
      )}
    </>
  );
};
