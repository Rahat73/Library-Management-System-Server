import httpStatus from "http-status";
import sendResponse from "../../utils/send-response";
import { BorrowRecordServices } from "./borrow-record.service";
import catchAsync from "../../utils/catch-async";

const createBorrowRecord = catchAsync(async (req, res) => {
  const result = await BorrowRecordServices.createBorrowRecordIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book borrowed successfully",
    data: result,
  });
});

const returnBook = catchAsync(async (req, res) => {
  const { borrowId } = req.body;
  await BorrowRecordServices.returnBookDB(borrowId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book returned successfully",
    // data: result,
  });
});

const getAllOverdueBorrows = catchAsync(async (req, res) => {
  const result = await BorrowRecordServices.getAllOverdueBorrowsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Overdue borrow list fetched",
    data: result,
  });
});

export const BorrowRecordControllers = {
  createBorrowRecord,
  returnBook,
  getAllOverdueBorrows,
};
