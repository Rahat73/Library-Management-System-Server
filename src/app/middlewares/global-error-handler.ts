/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  const success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = httpStatus.CONFLICT;
      message = "Duplicate Key error";
      error = err.meta;
    } else if (err.code === "P2025") {
      statusCode = httpStatus.NOT_FOUND;
    }
  } else if (err instanceof ZodError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = err.issues[0].message;
    error = err.issues;
  }

  res.status(statusCode).json({
    success,
    status: statusCode,
    message,
    // error,
  });
};

export default globalErrorHandler;
