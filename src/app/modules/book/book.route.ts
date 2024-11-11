import { Router } from "express";
import { BookControllers } from "./book.controller";

const router = Router();

router.get("/", BookControllers.getAllBooks);

export const BookRoutes = router;
