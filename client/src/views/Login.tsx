import React, { useState, useEffect } from "react";
import "./App.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getUserByCookie } from "../features/user/userAPI";
import { userSelector } from "../features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import hagada from "../imges/Hagada.jpg";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);
  const [values, setValues] = useState({
    name: "",
    password: "",
  });

  const toastOptions: any = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  useEffect(() => {
    dispatch(getUserByCookie());
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  const handleValidation = () => {
    const { password, name } = values;
    if (name === "") {
      toast.error("Please enter user name and password", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Please enter user name and password", toastOptions);
      return false;
    }

    return true;
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (handleValidation()) {
        const { password, name } = values;
        const { data } = await axios.post(`/api/v1/users/login`, {
          password,
          name,
        });

        const { status, userArray, role, error } = data;
        if (status) {
          navigate("/home");
        }
      }
    } catch (error: any) {

      toast.error(error.response.data.error, toastOptions);
    }
  };

  const handleChange = (event: any) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="FormContainer">
        <div className="fromWrapper">
          <form onSubmit={(ev) => handleOnSubmit(ev)}>
            <div className="from_header">
              <h1>LOGIN</h1>
            </div>
            <input
              className="form_input"
              type="name"
              placeholder="Name"
              name="name"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
              min="3"
            />

            <input
              className="form_input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />

            <button type="submit" className="form_button">
              Login
            </button>
            <span className="from_span">
              Don't have an accout? <Link to="/register">Register</Link>
            </span>
          </form>
        </div>
        <img className="login_image" src={hagada} alt="login" />
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;
