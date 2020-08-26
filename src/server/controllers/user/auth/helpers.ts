import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import constants from "../../../config/constants";

export const hashPassword = (pwd: string): string => {
  return bcrypt.hashSync(pwd, 14);
};

export const checkHashedPassword = (hashed: string, pwd: string) => {
  return bcrypt.compareSync(pwd, hashed);
};

export const generateToken = (str: string): string => {
  let token: string;
  try {
    token = jwt.sign(
      { data: str, exp: Math.floor(Date.now() / 1000 + 60 * 60) * 168 }, // 1 hour * 168 => 1 week
      constants.__tokenSecret__,
      { algorithm: "HS256" }
    );
    return token;
  } catch (err) {
    return err.message;
  }
};
