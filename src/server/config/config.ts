import IconfigInterface from "../interfaces/Iconfig.interface";

import * as dotenv from "dotenv";
dotenv.config();
const env = process.env;

const config: IconfigInterface = {
  port: Number(env.port),
  mongo_url: env.MONGO_URL,
  tokenSecret: env.TOKEN_SECRET,
};

export default config;
