import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
import { MemberRoutes } from "../modules/member/member.route";

const router = Router();

const routes = [
  {
    path: "/books",
    route: BookRoutes,
  },
  {
    path: "/members",
    route: MemberRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
