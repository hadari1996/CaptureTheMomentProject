import { sendMail } from "../auth/authCtrl";
import UserModel from "../users/userModel";
import EventModel, { Status } from "./eventModel";
import eventModel from "./eventModel";
// import logo from "../../assets/images/";

export default function isDatePass(date: Date) {
  try {
    const day = new Date(date!).getDate();
    const month = new Date(date!).getMonth() + 1;
    const year = new Date(date!).getFullYear();
    const today = new Date();
    if (year < today.getFullYear()) return false;
    else if (year == today.getFullYear() && month < today.getMonth() + 1)
      return false;
    else if (
      year == today.getFullYear() &&
      month == today.getMonth() + 1 &&
      day < today.getDate()
    )
      return false;
    return true;
  } catch (error) {
    console.error(error);
  }
}

export async function createEvent(req, res) {
  try {
    const { date } = req.body;
    const checkedDate = await eventModel.findOne({ date });
    if (!checkedDate) {
      const dateEvent = await eventModel.create({
        date,
        status: "open",
      });
      res.send({ status: true });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function getAllOpenDatesEvent(req, res) {
  try {
    let openDatesEvent = await EventModel.find({
      $or: [
        {
          status: Status.OPEN,
        },
        {
          status: Status.PENDING,
        },
      ],
    }).sort({ date: 1 });
    if (openDatesEvent.length > 0) {
      openDatesEvent = openDatesEvent.filter((obj) => {
        return isDatePass(obj.date) == true;
      });
    }
    res.send({ status: true, openDatesEvent: openDatesEvent });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function getAllOpenDatesEventCustomers(req, res) {
  try {
    let openDatesEvent = await EventModel.find({
      status: Status.OPEN,
    }).sort({ date: 1 });
    if (openDatesEvent.length > 0) {
      openDatesEvent = openDatesEvent.filter((obj) => {
        return isDatePass(obj.date) == true;
      });
    }
    res.send({ status: true, openDatesEvent: openDatesEvent });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function getAllClosedDatesEvent(req, res) {
  try {
    let closedDatesEvent = await EventModel.find({
      status: Status.APPROVED,
    }).sort({ date: 1 });
    if (closedDatesEvent.length > 0) {
      closedDatesEvent = closedDatesEvent.filter((obj) => {
        return isDatePass(obj.date) == true;
      });
    }
    res.send({ status: true, closedDatesEvent });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function updateEventStatus(req, res) {
  try {
    let eventDB1 = await EventModel.findById(req.params.eventId);
    let userName = await UserModel.findOne({ email: eventDB1.userid });
    const update = { status: Status.APPROVED };
    let eventDB = await EventModel.findByIdAndUpdate(
      req.params.eventId,

      { status: Status.APPROVED },
      {
        new: true,
      }
    );
    if (!eventDB) throw new Error("not found this date");
    eventDB.save;
    if (!eventDB) throw new Error("not found this date");

    const email = eventDB1.userid;
    if (!email) throw new Error("no email");

    const subject = "This event has been Approved by Rachel Hacham";
    const content = `<h3>Dear ${userName.name}, Your event has been Approved by the admin</h3>`;

    const status = sendMail(email, res, subject, content);
    if (!status) throw new Error("not send mail");
    res.send({ status: true, eventDB: eventDB });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function deleteEvent(req, res) {
  try {
    let eventDB = await EventModel.findByIdAndDelete(req.params.eventId);
    if (!eventDB) throw new Error("not found this date");
    res.send({ status: true, eventDB: eventDB });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}
export async function reopenEventStatus(req, res) {
  try {
    let eventDB = await EventModel.findById(req.params.eventId);
    let userName = await UserModel.findOne({ email: eventDB.userid });
    let eventDB1 = await EventModel.findByIdAndUpdate(
      req.params.eventId,

      { status: Status.OPEN, userid: "", packageType: "", price: null },
      {
        new: true,
      }
    );
    if (!eventDB) throw new Error("not found this date");

    const email = eventDB.userid;
    if (!email) throw new Error("no email");

    const subject = "This event has been cancceld";
    const content = `<h3>Dear ${userName.name}, Your event has been cancceled by the admin</h3> 
    <p>Your money will be back at your account in three buissness days, please contact us in case it didn't, good day!</p>`;

    const status = sendMail(email, res, subject, content);
    if (!status) throw new Error("not send mail");

    res.send({ status1: true, eventDB: eventDB1, email: eventDB.userid });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function updateEventPackage(req, res) {
  try {
    const { packageInformation } = req.body;
    const { user } = req.body;
    let eventExsits = await EventModel.find({ userid: user.email });
    eventExsits = eventExsits.filter((obj) => {
      return isDatePass(obj.date) == true;
    });
    if (eventExsits.length > 0) {
      throw new Error("You already select Event date");
    } else {
      let eventDB = await EventModel.findByIdAndUpdate(
        req.params.eventId,
        {
          status: Status.PENDING,
          packageType: packageInformation.packageName,
          price: packageInformation.packagePrice,
          userid: user.email,
        },
        {
          new: true,
        }
      );
      if (!eventDB) throw new Error("not found this date");
      eventDB.save;

      res.send({ status: true, eventDB: eventDB });
    }
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}

export async function getMyPackage(req, res) {
  try {
    const { email } = req.params;
    let UserPackage = await EventModel.find({
      userid: email,
    });
    if (UserPackage.length > 0) {
      UserPackage = UserPackage.filter((obj) => {
        return isDatePass(obj.date) == true;
      });
    }
    res.send({ status: true, UserPackage });
  } catch (error) {
    res.status(500).send({ error: error.message, status: false });
  }
}
