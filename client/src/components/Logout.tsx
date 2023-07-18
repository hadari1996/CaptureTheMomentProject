import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import "../Logout.scss";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Action } from "@reduxjs/toolkit";

export const Logout = () => {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/logout`);
      const { logout } = data;
      if (logout) navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <LogoutOutlinedIcon
        onClick={handleClick}
        sx={{ color: "#020202", size: "large" }}
      ></LogoutOutlinedIcon>
    </div>
  );
};
