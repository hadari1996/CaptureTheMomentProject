import React, { useEffect } from "react";
import Slideshow from "./../components/Slider";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import { useNavigate } from "react-router-dom";
import { userSelector } from "../features/user/userSlice";
import Login from "./Login";
import { getUserByCookie } from "../features/user/userAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import "./App.scss";
import useOverFlowHidden from "../hooks/useOverFlowHidden";

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  useOverFlowHidden();
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="home">
      <Navbar />
      <Slideshow />
      <ContactForm />
    </div>
  );
}

export default Home;
