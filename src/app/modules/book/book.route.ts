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

export const BookRoutes = router;
