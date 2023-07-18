import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import Navbar from "../components/Navbar";
import { Event } from "../features/events/eventModel";
import axios from "axios";
import masoret from "../imges/masoret.jpg";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

export const YourDatePackageSelected = () => {
  const [packageUser, setPackageUser] = useState<Event>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const user = useAppSelector(userSelector);
  useEffect(() => {
    getUserPackage();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const getUserPackage = async () => {
    const { data } = await axios.get(
      `/api/v1/events/my-package/${user?.email}`
    );
    setIsLoading(false);
    const { UserPackage, status } = data;
    setPackageUser(UserPackage[0]);
  };
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Box
          sx={{
            height: "20%",
            width: "50%",
            padding: "10px",
            display: "flex",
            justifyContent: "right",
             fontFamily: "'Rubik', sans-serif" 
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : packageUser ? (
        <>
          <Box
            sx={{
              marginTop: "5vh",
              display: "flex",
              alignItems: "revert",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Card sx={{ width: "50%" }}>
              <>
                <CardMedia
                  sx={{ height: 290 }}
                  image={masoret}
                  title="yourPackage"
                />

                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    {packageUser!.packageType}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {JSON.stringify(packageUser.date).substr(1, 10)}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {packageUser!.status}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {JSON.stringify(packageUser.price)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </>
            </Card>
          </Box>
        </>
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
    </>
  );
};

// {isloading ? <spinner> : (array.length ?  <map> : <no data>)}
