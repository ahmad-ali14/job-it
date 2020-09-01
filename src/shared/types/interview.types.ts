import * as mongoose from "mongoose";

export interface Interview {
  _id: mongoose.Types.ObjectId;
  time: Date;
  company: string;
  comments?: string[];
}
