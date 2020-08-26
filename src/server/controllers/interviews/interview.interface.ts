import * as mongoose from "mongoose";

interface Interview {
  _id: mongoose.Types.ObjectId;
  time: Date;
  company: string;
  comments?: string[];
}

export default Interview;
