import express from "express";
import { login, register, getUserByCookie, logout } from "./userCtrl";

const router = express.Router();

router

  .post("/login", login)
  .post("/register", register)
  .get("/get-user-by-cookie", getUserByCookie)
  .get("/logout", logout);

export default router;
