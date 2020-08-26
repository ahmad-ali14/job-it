import IconfigInterface from "./Iconfig.interface";

import * as dotenv from "dotenv";
dotenv.config();
const env = process.env;

const config: IconfigInterface = {
  __port__: Number(env.port),
  __mongo_url__: env.MONGO_URL,
  __tokenSecret__: env.TOKEN_SECRET,
};

export default config;
