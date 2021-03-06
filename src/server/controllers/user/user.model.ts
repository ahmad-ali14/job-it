import * as mongoose from "mongoose";
import { Iuser } from "../../../shared/types/user.types";

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    interviews: [],
  },
  { timestamps: true }
);

const userModel = mongoose.model<Iuser & mongoose.Document>(
  "User",
  userSchema,
  "users"
);

export default userModel;
