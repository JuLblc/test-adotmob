import { Request, Response, NextFunction } from "express";
import axios, { AxiosResponse } from "axios";

const routeTest = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome",
  });
};

export default { routeTest };
