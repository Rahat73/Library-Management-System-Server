import { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
import { MemberRoutes } from "../modules/member/member.route";
import { BorrowRecordRoutes } from "../modules/borrow-record/borrow-record.route";

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
  {
    path: "/",
    route: BorrowRecordRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
