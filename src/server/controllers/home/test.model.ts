import * as mongoose from "mongoose";
import Itest from "./test.interface";

const testSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const testModel = mongoose.model<Itest & mongoose.Document>("Test", testSchema);

export default testModel;
