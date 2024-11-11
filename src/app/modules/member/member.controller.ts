import httpStatus from "http-status";
import catchAsync from "../../utils/catch-async";
import { MemberServices } from "./member.service";
import sendResponse from "../../utils/send-response";

const createMember = catchAsync(async (req, res) => {
  const result = await MemberServices.createMemberIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Member created successfully",
    data: result,
  });
});

const getAllMembers = catchAsync(async (req, res) => {
  const result = await MemberServices.getAllMembersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Members retrieved successfully",
    data: result,
  });
});

const getMemberById = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.getMemberByIdFromDB(memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member retrieved successfully",
    data: result,
  });
});

const updateMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  const result = await MemberServices.updateMemberIntoDB(memberId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member updated successfully",
    data: result,
  });
});

const deleteMember = catchAsync(async (req, res) => {
  const { memberId } = req.params;
  await MemberServices.deleteMemberFromDB(memberId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Member successfully deleted",
    // data: result,
  });
});

export const MemberControllers = {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
};
