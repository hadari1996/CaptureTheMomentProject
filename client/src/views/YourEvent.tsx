import React, { useEffect, useState } from "react";
import CardDateEvent from "../components/cardDateEvent/cardDateEvent";
import EventCard from "../components/EventCard";
import { ThemeProvider } from "styled-components";
import { Event } from "../features/events/eventModel";
import theme from "../colors/color";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "../features/user/userAPI";
import { Box, CircularProgress, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";

function YourEvent() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [openEvents, setOpenEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllOpenDates = async () => {
    const { data } = await axios.get(`/api/v1/events/open-dates-customers`);
    const { openDatesEvent, status } = data;
    setOpenEvents(openDatesEvent);
    setIsLoading(false);
  };
  useEffect(() => {
    getAllOpenDates();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <Navbar></Navbar>
      <Container sx={{ display: "flex", paddingTop: "14px" }}>
        {isLoading ? (
          <Box
            sx={{
              height: "20%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <CircularProgress color="inherit" />
          </Box>
        ) : openEvents.length > 0 ? (
          <Grid
            container
            gridTemplateColumns={3}
            gap={"30px"}
            sx={{
              overflowY: "scroll",
              height: "80vh",
              padding: "30px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ThemeProvider theme={theme}>
              {openEvents.length > 0 ? (
                <>
                  {openEvents.map((ev: Event, idx) => {
                    return <EventCard key={idx} eventDate={ev} />;
                  })}
                </>
              ) : (
                <h1>hi</h1>
              )}
            </ThemeProvider>
          </Grid>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          >
            <h1>No events found</h1>
          </Box>
        )}
      </Container>
    </>
  );
}

export default YourEvent;
