import mongoose from "mongoose";
import Joi from "Joi";
import { joiPasswordExtendCore } from "joi-password";
const JoiPassword = Joi.extend(joiPasswordExtendCore);
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, required: true },
});
const UserModel = mongoose.model("users-capturethemoments", UserSchema);

export const UserValidation = Joi.object({
  email: Joi.string().email().required(),
  password: JoiPassword.string()
    .min(2)
    .max(16)
    .minOfNumeric(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .required(),
  confirmPassword: Joi.ref("password"),
});

export default UserModel;
