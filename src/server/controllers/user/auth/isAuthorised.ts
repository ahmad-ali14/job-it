import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import constants from "../../../config/constants";

const isAuthorised = (req: Request, res: Response, next: () => void) => {
  if (req.header("Authorization")) {
    const token = req.header("Authorization").split(" ")[1];
    jwt.verify(token, constants.__tokenSecret__, (err, decoded) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    return res.sendStatus(403);
  }
};

export default isAuthorised;
