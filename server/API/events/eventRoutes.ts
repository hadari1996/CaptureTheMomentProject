import express from "express";
import {
  createEvent,
  deleteEvent,
  getAllClosedDatesEvent,
  getAllOpenDatesEvent,
  getAllOpenDatesEventCustomers,
  getMyPackage,
  reopenEventStatus,
  updateEventPackage,
  updateEventStatus,
} from "./eventCtrl";

const router = express.Router();

router

  .post("", createEvent)
  .get("/open-dates", getAllOpenDatesEvent)
  .get("/open-dates-customers", getAllOpenDatesEventCustomers)
  .get("/closed-dates", getAllClosedDatesEvent)
  .patch("/:eventId/status", updateEventStatus)
  .delete("/:eventId", deleteEvent)
  .post("/reopen-event/:eventId", reopenEventStatus)
  .patch("/update-event-package/:eventId", updateEventPackage)
  .get("/my-package/:email", getMyPackage);

export default router;
