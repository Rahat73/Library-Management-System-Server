import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";

const router = Router();

const routes = [
  {
    path: "/books",
    route: BookRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
