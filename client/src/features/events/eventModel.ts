export enum Status {
  OPEN = "open",
  PENDING = "pending",
  APPROVED = "approved",
}

export interface Event {
  date: Date;
  _id: String;
  status: Status;
  email: String;
  packageType: String;
  price: Number;
}
