import * as express from "express";
import { Application } from "express";
import * as mongoose from "mongoose";
import constants from "./config/constants";
// import * as cors from "cors";

class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; middleWares: any; controllers: any }) {
    this.app = express();
    this.port = appInit.port;

    this.initDatabase();
    this.middlewares(appInit.middleWares);
    this.routes(appInit.controllers);
    this.assets();
    this.template();
  }

  private middlewares(middleWares: {
    forEach: (arg0: (middleWare: any) => void) => void;
  }) {
    middleWares.forEach((middleWare) => {
      this.app.use(middleWare);
    });
  }

  private routes(controllers: {
    forEach: (arg0: (controller: any) => void) => void;
  }) {
    controllers.forEach((controller) => {
      this.app.use("/api", controller.router);
    });
  }

  private assets() {
    this.app.use(express.static("public"));
    this.app.use(express.static("views"));
    // this.app.use(cors());
  }

  private template() {
    this.app.set("view engine", "pug");
  }

  private initDatabase() {
    mongoose
      .connect(constants.__mongo_url__, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
      .then((conn) => {
        // tslint:disable-next-line:no-console
        console.log("connected successfully to ", conn.connections[0].name);
      })
      .catch((err) => {
        throw new Error("Error:" + err);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      // tslint:disable-next-line:no-console
      console.log(`App listening on ${this.port}`);
    });
  }
}

export default App;
