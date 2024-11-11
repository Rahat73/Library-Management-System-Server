import prisma from "../../utils/prisma";
import { IMember } from "./member.interface";

const createMemberIntoDB = async (payload: IMember) => {
  const result = await prisma.member.create({
    data: payload,
  });

  return result;
};

const getAllMembersFromDB = async () => {
  const result = await prisma.member.findMany();

  return result;
};

const getMemberByIdFromDB = async (memberId: string) => {
  const result = await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  return result;
};

const updateMemberIntoDB = async (memberId: string, payload: IMember) => {
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  const result = await prisma.member.update({
    where: {
      memberId,
    },
    data: payload,
  });

  return result;
};

const deleteMemberFromDB = async (memberId: string) => {
  await prisma.member.findUniqueOrThrow({
    where: {
      memberId,
    },
  });

  const result = await prisma.member.delete({
    where: {
      memberId,
    },
  });

  return result;
};

export const MemberServices = {
  createMemberIntoDB,
  getAllMembersFromDB,
  getMemberByIdFromDB,
  updateMemberIntoDB,
  deleteMemberFromDB,
};
