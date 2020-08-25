import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase.interface";
import testModel from "./test.model";
import Itest from "./test.interface";
import { Document } from "mongoose";

class HomeController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get("/", this.index);
    this.router.post("/", this.create);
  }

  index = (req: Request, res: Response) => {
    testModel.find({}).then((users) => {
      res.status(200).json(users);
    });
  };

  create = (req: Request, res: Response) => {
    const test = new testModel(req.body);

    test
      .save()
      .then((product: Itest) => {
        res.status(200).send(product);
      })
      .catch((err) => {
        res.status(500).send({ err });
      });
  };
}

export default HomeController;
