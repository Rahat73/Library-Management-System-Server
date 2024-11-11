import httpStatus from "http-status";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBookIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Book created successfully",
    data: result,
  });
});

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
  createBook,
  getAllBooks,
};
