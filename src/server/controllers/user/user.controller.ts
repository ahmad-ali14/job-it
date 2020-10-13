import * as express from "express";
import { Request, Response } from "express";
import IControllerBase from "../../interfaces/IControllerBase.interface";
import userModel from "./user.model";
import {
  Iuser,
  IuserWithoutPassword,
  LoginResponse,
  GetUserDataResponse,
} from "../../../shared/types/user.types";
import mongoose, { Document } from "mongoose";
import {
  hashPassword,
  checkHashedPassword,
  generateToken,
} from "./auth/helpers";
import isAuthorised from "./auth/isAuthorised";

class UserController implements IControllerBase {
  public path = "/";
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post("/user/signup", this.signup);
    this.router.post("/user/login", this.login);
    this.router.get("/user/all", isAuthorised, this.users);
    this.router.get("/user/single/:userId", isAuthorised, this.userData);
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
        const userId = mongoose.Types.ObjectId();
        const user: Iuser = {
          _id: userId,
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
    let responseObject: LoginResponse;
    let userToSend: IuserWithoutPassword;

    if (!email || !reqPassword) {
      responseObject = {
        user: null,
        err: "Email or Password is missing.",
        isAuthorised: false,
        interviews: [],
        token: null,
      };
      return res.status(500).send(responseObject);
    }

    userModel
      .findOne({ email })
      .then((user) => {
        if (user) {
          const authorised = checkHashedPassword(user.password, reqPassword);

          if (authorised) {
            // Authorised
            const token = generateToken(email);

//             userToSend = {
//               _id: user._id,
//               firstName: user.firstName,
//               lastName: user.lastName,
//               email: user.email,
//             };
            
            delete user.password;

            console.log(user);
            
            responseObject = {
              user: user,
              token: token,
              err: null,
              isAuthorised: true,
              interviews: user.interviews,
            };

            res.status(200).json(responseObject);
          } else {
            //wrong password
            responseObject = {
              user: null,
              token: null,
              err: "wrong Email or password",
              isAuthorised: false,
              interviews: [],
            };
            res.status(403).send(responseObject);
          }
        } else {
          // worng Email -> No user
          responseObject = {
            user: null,
            token: null,
            err: "No user, please create an account firstst.",
            isAuthorised: false,
            interviews: null,
          };

          res.status(403).json(responseObject);
        }
      })
      .catch((err) => console.error(err));
  };

  // user Data route

  userData = (req: Request, res: Response) => {
    const userId = req.params.userId;
    let responseObject: GetUserDataResponse;
    let userToSend: IuserWithoutPassword;

    userModel
      .findOne({ _id: userId })
      .then((user) => {
        if (user) {
          //user existed
          userToSend = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };

          responseObject = {
            user: userToSend,
            err: null,
            interviews: user.interviews,
            isAuthorised: true,
          };

          res.status(200).json(responseObject);
        } else {
          // No data Existed
          responseObject = {
            user: null,
            err: "No user Found, please login",
            interviews: [],
            isAuthorised: false,
          };
          res.status(404).send(responseObject);
        }
      })
      .catch((err) => console.error(err));
  };
}

export default UserController;
