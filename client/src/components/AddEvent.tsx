import React, { ChangeEventHandler, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import "../style/addEvent.scss";
import axios from "axios";
import isDatePass from "../helppers/isDatePass";
import { ToastContainer, toast } from "react-toastify";
import { Box, Container, Paper, Stack } from "@mui/material";
import { Grid } from "semantic-ui-react";

function AddEvent() {
  const [date, setDate] = useState<Date | undefined>();
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleOnChange = async (event: any) => {
    setDate(event.target.value);
  };

  const handleSelect = async (event: any) => {
    try {
      if (date === undefined)
        toast.error(`Didn't choosed a date`, toastOptions);
      else if (isDatePass(date)) {
        const { data } = await axios.post(`/api/v1/events/`, {
          date,
        });
        const { status, error } = data;
        if (status) toast.success(`Date ${date} saved`, toastOptions);
        else {
          toast.error(`Date ${date} already exsits`, toastOptions);
        }
      } else {
        toast.error("Date is Passed", toastOptions);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10vh",
      }}
    >
      <Paper
        elevation={9}
        sx={{
          height: "17rem",
          width: "17rem",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>Add Event</h1>
          </Box>
          <Box
            sx={{
              fontSize: "20px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              type="date"
              className="add-event-date-input"
              onChange={handleOnChange}
            />
            <IoMdAdd className="add_icon" onClick={handleSelect} />
          </Box>
          <ToastContainer />
        </Stack>
      </Paper>
    </Container>

    // <div className="container-add-event">
    //   <h1>Add Event</h1>
    //   <div className="wrapper-add-event">
    //     <input
    //       type="date"
    //       className="add-event-date-input"
    //       onChange={handleOnChange}
    //     />
    //     <IoMdAdd className="add_icon" onClick={handleSelect} />
    //   </div>
    //   <ToastContainer />
    // </div>
  );
}

export default AddEvent;
