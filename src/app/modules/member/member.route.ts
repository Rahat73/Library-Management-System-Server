import { Router } from "express";
import validateRequest from "../../middlewares/validate-request";
import { MemberControllers } from "./member.controller";
import { MemberValidation } from "./member.validation";

const router = Router();

router.post(
  "/",
  validateRequest(MemberValidation.createMemberValidation),
  MemberControllers.createMember
);

router.get("/", MemberControllers.getAllMembers);

router.get("/:memberId", MemberControllers.getMemberById);

router.put(
  "/:memberId",
  validateRequest(MemberValidation.updateMemberValidation),
  MemberControllers.updateMember
);

router.delete("/:memberId", MemberControllers.deleteMember);

export const MemberRoutes = router;
