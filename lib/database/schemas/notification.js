import { Schema, model, models } from "mongoose";

const NotificationSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Notification =
  models.Notification || model("Notification", NotificationSchema);
export default Notification;
