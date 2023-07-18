import mongoose from "mongoose";

export enum Status {
  OPEN = "open",
  PENDING = "pending",
  APPROVED = "approved",
}

const EventSchema = new mongoose.Schema({
  date: Date,
  status: { type: String, enum: [Status.OPEN, Status.PENDING, Status.APPROVED] },
  email: String,
  packageType: String,
  price: Number,
});
const EventModel = mongoose.model("event-capturethemoments", EventSchema);

export default EventModel;
