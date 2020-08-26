import App from "./app";
import * as bodyParser from "body-parser";
import constants from "./config/constants";

// middlewares
import loggerMiddleware from "./middlewares/logger";

// controllers
import HomeController from "./controllers/home/home.controller";
import UserController from "./controllers/user/user.controller";
import InterviewController from "./controllers/interviews/interview.controller";

const app = new App({
  port: constants.__port__ || 3000,
  controllers: [
    new HomeController(),
    new UserController(),
    new InterviewController(),
  ],
  middleWares: [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    loggerMiddleware,
  ],
});

app.listen();
