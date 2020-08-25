import { Request, Response } from "express";

const loggerMiddleware = (req: Request, resp: Response, next: () => void) => {
  // tslint:disable-next-line:no-console
  console.log(
    "Request logged:",
    new Date().toLocaleTimeString(),
    req.method,
    req.path
  );
  next();
};

export default loggerMiddleware;
