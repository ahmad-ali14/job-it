import Interview from "../../server/controllers/interviews/interview.interface";
import * as mongoose from "mongoose";

export interface Iuser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  interviews?: Interview[];
}

export interface IuserWithoutPassword {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse {
  user: IuserWithoutPassword | null;
  interviews: Interview[] | [];
  isAuthorised: boolean;
  err: string | null;
  token: string | null;
}

export interface GetUserDataResponse {
  user: IuserWithoutPassword | null;
  interviews: Interview[] | [];
  err: string;
  isAuthorised: boolean;
}

export interface UserStateInReduxStore {
  user: IuserWithoutPassword | null;
  isAuthorised: boolean;
  interviews: Interview[] | [];
  err: string | null;
  token: string | null;
  isLoading: boolean;
}
