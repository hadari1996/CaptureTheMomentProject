import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser = require("cookie-parser");

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

import userRoutes from "./API/users/userRoutes";
app.use("/api/v1/users", userRoutes);
import eventRoutes from "./API/events/eventRoutes";
app.use("/api/v1/events", eventRoutes);



mongoose.set("strictQuery", true);

const mongo_uri = process.env.MONGO_URI;
mongoose
  .connect(mongo_uri)
  .then(() => {
    console.log("connected sucessfully to DB");
  })
  .catch((error) => {
    console.log("at mongoose connect:");
    console.log(error.message);
  });

const server = app.listen(PORT, () => {
  console.log(`Server is listening in PORT ${PORT}`);
});
