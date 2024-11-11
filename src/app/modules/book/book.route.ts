import { Router } from "express";
import { BookControllers } from "./book.controller";
import { BookValidations } from "./book.validation";
import validateRequest from "../../middlewares/validate-request";

const router = Router();

router.post(
  "/",
  validateRequest(BookValidations.createBookValidation),
  BookControllers.createBook
);

router.get("/", BookControllers.getAllBooks);

router.get("/:bookId", BookControllers.getBookById);

router.put(
  "/:bookId",
  validateRequest(BookValidations.updateBookValidation),
  BookControllers.updateBook
);

router.delete("/:bookId", BookControllers.deleteBook);

export const BookRoutes = router;
