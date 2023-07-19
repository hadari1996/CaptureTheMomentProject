import React, { FC, useEffect, useState } from "react";
import { IoMdAlert, IoMdCreate, IoMdImage, IoMdPhotos } from "react-icons/io";
import { IoIosClock } from "react-icons/io";
import { Event, Status } from "../features/events/eventModel";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import eventPackages, { packageType } from "../features/packages/package";
import { getUserByCookie } from "../features/user/userAPI";
import { ToastContainer, toast } from "react-toastify";
import {
  Button,
  Paper,
  IconButton,
  Grid,
  Box,
  Stack,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from "@mui/material";

interface EventCardProps {
  eventDate: Event;
  openEvents?: Event[];
  setOpenEvents?: CallableFunction;
}

const EventCard: FC<EventCardProps> = ({
  eventDate,
  openEvents,
  setOpenEvents,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [status, setStatus] = useState(eventDate.status);
  const [packageSelect, setPackageSelect] = useState<string>("");
  const [packages, setPackages] = useState<packageType[]>([]);
  const [packageInformation, setPackageInformation] = useState<packageType>();
  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    setPackages(eventPackages);
  }, []);

  useEffect(() => {
    const result = packages.filter(
      (pack) => pack.packageName === packageSelect
    );
    setPackageInformation(result[0]);
  }, [packageSelect]);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  const filterEventList = (
    status: boolean,
    openEvents: Event[],
    eventDate: Event,
    setOpenEvents: CallableFunction
  ) => {
    if (status) {
      if (openEvents && openEvents.length > 0) {
        const res = openEvents.filter((ev) => ev._id != eventDate._id);
        setOpenEvents(res);
      }
    }
  };

  async function handleSendEventPackage(event: React.MouseEvent<HTMLElement>) {
    try {
      if (packageInformation == undefined) {
        toast.error(`package is not selected`, toastOptions);
        return;
      } else {
        const { data } = await axios.patch(
          `/api/v1/events/update-event-package/${eventDate._id}`,
          {
            packageInformation,
            user,
          }
        );

        navigate("/your-date-package-selected");
      }
    } catch (error: any) {
      toast.error(error.response.data.error, toastOptions);
    }
  }

  function handleSelect(event: any) {
    setPackageSelect(event.target.value);
  }

  async function handleApprove(event: React.MouseEvent<HTMLElement>) {
    try {
      setStatus(Status.APPROVED);
      const { data } = await axios.patch(
        `/api/v1/events/${eventDate._id}/status`
      );
      const { status } = data;
      if (openEvents && setOpenEvents) {
        filterEventList(status, openEvents, eventDate, setOpenEvents);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function handleDeleteEvent(event: React.MouseEvent<HTMLElement>) {
    try {
      const { data } = await axios.delete(`/api/v1/events/${eventDate._id}`);
      const { status } = data;
      if (openEvents && setOpenEvents) {
        filterEventList(status, openEvents, eventDate, setOpenEvents);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  }

  async function handleDeny(this: any, event: React.MouseEvent<HTMLElement>) {
    try {
      const { data } = await axios.post(
        `/api/v1/events/reopen-event/${eventDate._id}`
      );
      const { status, email } = data;
      setStatus(Status.OPEN);
    } catch (error: any) {
      console.error(error.message);
    }
  }

  if (user!.role == 1) {
    return (
      <Grid item>
        <Paper
          elevation={3}
          sx={{ height: "13rem", width: "13rem", padding: "10px" }}
        >
          <Stack spacing={2}>
            <Box sx={{ fontSize: "20px" }}>
              {status === "pending" ? (
                <IoMdAlert className="icon-status" />
              ) : (
                <IoIosClock className="icon-status" />
              )}
            </Box>

            <h5>{JSON.stringify(eventDate.date).substr(1, 10)}</h5>
            <h5>{eventDate.status}</h5>
            {status === "open" ? null : <h5>{eventDate.email}</h5>}
            {status === "pending" ? (
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="success"
                  size={"small"}
                  onClick={handleApprove}
                >
                  APPROVE
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleDeny}
                  size={"small"}
                >
                  DENY
                </Button>
              </Box>
            ) : null}

            {eventDate.status === "open" ? (
              <Box>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={handleDeleteEvent}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : null}
          </Stack>
        </Paper>
      </Grid>
    );
  } else if (user!.role == 0) {
    return (
      <Grid item>
        <Paper
          elevation={3}
          sx={{ height: "15rem", width: "14rem", padding: "10px" }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ fontSize: "20px", padding: "0px", margin: "0px" }}>
                <IoMdCreate className="icon-status" />
              </Box>
              <h3>{JSON.stringify(eventDate.date).substr(1, 10)}</h3>
            </Box>
            <h3>{status}</h3>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
                <Select
                  sx={{ textAlign: "center" }}
                  name={JSON.stringify(eventDate._id)}
                  className="package-option"
                  value={packageSelect}
                  onChange={(event: any) => handleSelect(event)}
                  size="small"
                >
                  {packages?.map((p, index) => {
                    return (
                      <MenuItem
                        value={p.packageName}
                        key={index}
                        sx={{ textAlign: "center" }}
                      >
                        {p.packageName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <p>
                {packageInformation
                  ? `${packageInformation.packagePrice!}`
                  : null}
              </p>
            </Box>
            <Button
              variant="contained"
              color="success"
              size={"small"}
              onClick={handleSendEventPackage}
            >
              SEND
            </Button>
            <ToastContainer />
          </Stack>
        </Paper>
      </Grid>
    );
  } else {
    return null;
  }
};

export default EventCard;
