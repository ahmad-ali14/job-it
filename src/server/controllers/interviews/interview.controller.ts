import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase.interface";
import userModel from "../user/user.model";
import { Iuser } from "../../../shared/types/user.types";
import * as mongoose from "mongoose";
import isAuthorised from "../user/auth/isAuthorised";
import { Interview } from "../../../shared/types/interview.types";
import companyModel from "../companies/company.model";
import Icompany from "../companies/company.interface";

class InterviewController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/interview/add", this.create);
    this.router.put("/interview/update", this.update);
    this.router.delete("/Interview/delete", this.delete);
  }

  create = (req: Request, res: Response) => {
    const { userId, time, company, comments } = req.body;
    const interviewId = mongoose.Types.ObjectId();

    const interview: Interview = { _id: interviewId, time, company, comments };

    // const initCompany: Icompany = { name: company, contact: "" };

    const newCompany = new companyModel({
      name: company,
      contact: "",
    } as Icompany);

    newCompany.save();

    userModel
      .updateOne({ _id: userId }, { $push: { interviews: interview } })
      .then(() => {
        userModel.find({ _id: userId }).then((result) => {
          res.status(200).send(result);
        });
      })
      .catch((err) => res.status(500).send({ err }));
  };

  update = (req: Request, res: Response) => {
    const { userId, interviewId, time, company, comments } = req.body;

    const interview: Interview = { _id: interviewId, time, company, comments };

    userModel
      .updateOne(
        {
          _id: userId,
          interviews: {
            $elemMatch: { _id: interviewId },
          },
        },
        {
          $set: {
            "interviews.$._id": interview._id,
            "interviews.$.time": interview.time,
            "interviews.$.company": interview.company,
            "interviews.$.comments": interview.comments,
          },
        }
      )
      .then(() => {
        userModel.find({ _id: userId }).then((result) => {
          res.status(200).send(result);
        });
      })
      .catch((err) => res.status(500).send({ err }));
  };

  delete = (req: Request, res: Response) => {
    const { userId, interviewId } = req.body;

    userModel
      .updateOne(
        { _id: userId },
        {
          $pull: {
            interviews: { _id: mongoose.Types.ObjectId(interviewId) },
          },
        }
      )
      .then(() => {
        userModel.find({ _id: userId }).then((result) => {
          res.status(200).send(result);
        });
      })
      .catch((err) => res.status(500).send({ err }));
  };
}

export default InterviewController;
