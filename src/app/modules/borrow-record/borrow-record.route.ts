import { Router } from "express";
import validateRequest from "../../middlewares/validate-request";
import { BorrowRecordValidation } from "./borrow-record.validation";
import { BorrowRecordControllers } from "./borrow-record.controller";

const router = Router();

router.post(
  "/borrow",
  validateRequest(BorrowRecordValidation.createBorrowRecordValidation),
  BorrowRecordControllers.createBorrowRecord
);

router.post(
  "/return",
  validateRequest(BorrowRecordValidation.returnBookValidation),
  BorrowRecordControllers.returnBook
);

export const BorrowRecordRoutes = router;
