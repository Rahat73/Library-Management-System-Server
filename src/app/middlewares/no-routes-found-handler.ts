import { Request, Response } from "express";
import httpStatus from "http-status";

const noRoutesFound = (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    status: httpStatus.NOT_FOUND,
    message: "API NOT FOUND!",
    // error: {
    //   path: req.originalUrl,
    //   message: "Your requested path is not found!",
    // },
  });
};

export default noRoutesFound;
