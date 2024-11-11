import httpStatus from "http-status";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { BookServices } from "./book.service";

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooksFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books retrieved successfully",
    data: result,
  });
});

export const BookControllers = {
  getAllBooks,
};
