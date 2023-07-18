import React, { useEffect, useState } from "react";
import AddEvent from "./AddEvent";
import { OpenEvent } from "./OpenEvent";
import ClosedEvents from "./ClosedEvents";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { getUserByCookie } from "../features/user/userAPI";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Container } from "@mui/material";
import "../views/App.scss";
export const AdminMenu = () => {
  const [currentSelected, setCurrentSelected] = useState("add event");
  const [isFilled, setIsFilled] = useState(true);
  const [isFilled1, setIsFilled1] = useState(false);
  const [isFilled2, setIsFilled2] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  function handleClick(ev: String) {
    if (ev == "add event") {
      setCurrentSelected("add event");
      setIsFilled(true);
      setIsFilled1(false);
      setIsFilled2(false);
    } else if (ev == "open dates") {
      setCurrentSelected("open dates");
      setIsFilled1(true);
      setIsFilled(false);
      setIsFilled2(false);
    } else {
      setCurrentSelected("closed events");
      setIsFilled2(true);
      setIsFilled1(false);
      setIsFilled(false);
    }
  }
  return (
    <Container sx={{ display: "flex", padding: "14px" }}>
      <Box style={{ display: "flex" }}>
        <Container
          sx={{
            width: "20vw",
            flexShrink: 0,
            height: "100vh",
            display: "flex",
          }}
        >
          <Box sx={{ overflow: "auto", width: "100%", margin: 0 }}>
            <List sx={{ width: "100%" }}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleClick("add event")}
                  // sx={{backgroundColor: "ButtonHighlight"}}
                  selected={isFilled}
                >
                  <span>Add Events</span>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  className={isFilled1 ? "filled" : "none"}
                  onClick={() => handleClick("open dates")}
                  selected={isFilled1}
                >
                  <span>Open Events</span>
                </ListItemButton>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <ListItemButton
                  className={isFilled2 ? "filled" : "none"}
                  onClick={() => handleClick("closed events")}
                  selected={isFilled2}
                >
                  <span>Closed Events</span>
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />
          </Box>
        </Container>
      </Box>
      {currentSelected ? (
        currentSelected == "add event" ? (
          <AddEvent />
        ) : currentSelected == "open dates" ? (
          <OpenEvent />
        ) : (
          <ClosedEvents />
        )
      ) : null}
    </Container>
  );
};
