import React, { useEffect } from "react";
import { AdminMenu } from "../components/AdminMenu";
import Navbar from "../components/Navbar";
import { getUserByCookie } from "../features/user/userAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { userSelector } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const Admin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (!user || user.role != 1) {
      navigate("/");
    }
  }, [user]);

  return (
    <Box>
      <Navbar />
      <Box>
        <AdminMenu></AdminMenu>
      </Box>
    </Box>
  );
};

export default Admin;
