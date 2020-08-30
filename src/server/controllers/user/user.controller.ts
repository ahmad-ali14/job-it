import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase.interface";
import userModel from "./user.model";
import Iuser from "./user.interface";
import { Document } from "mongoose";
import {
  hashPassword,
  checkHashedPassword,
  generateToken,
} from "./auth/helpers";
import isAuthorised from "./auth/isAuthorised";
import Interview from "../interviews/interview.interface";

class UserController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/user/signup", this.signup);
    this.router.post("/user/login", this.login);
    this.router.get("/user/all", this.users);
  }

  users = (req: Request, res: Response) => {
    userModel.find({}).then((users) => {
      res.status(200).json(users);
    });
  };

  signup = (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;

    userModel.findOne({ email }).then((result) => {
      if (result) {
        return res.status(500).send({ err: "email used by another account" });
      } else {
        const password = hashPassword(req.body.password);
        // const initInterview: Interview = {};
        const user: Iuser = {
          firstName,
          lastName,
          email,
          password,
          interviews: [],
        };

        const newUser = new userModel(user);

        newUser
          .save()
          .then((product: Iuser & Document) => {
            res.status(200).send(product);
          })
          .catch((err) => {
            res.status(500).send({ err });
          });
      }
    });
  };

  // log in route
  login = (req: Request, res: Response) => {
    const { email } = req.body;
    const reqPassword = req.body.password;

    console.log(req.body);

    if (!email || !reqPassword) {
      return res.status(500).send({ err: "Email or Password is missing." });
    }

    userModel.findOne({ email }).then((user) => {
      console.log("user", user.password);
      console.log("req", reqPassword);

      const authorised = checkHashedPassword(user.password, reqPassword);

      if (authorised) {
        const token = generateToken(email);
        console.log({ user, token });

        res.status(200).json({ user, token });
      } else {
        res.sendStatus(403);
      }
    });
  };
}

export default UserController;
