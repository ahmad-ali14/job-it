import * as mongoose from "mongoose";
import ICompany from "./company.interface";

const companySchema = new mongoose.Schema(
  {
    name: String,
    contact: String,
  },
  { timestamps: true }
);

const companyModel = mongoose.model<ICompany & mongoose.Document>(
  "Company",
  companySchema,
  "companies"
);

export default companyModel;
