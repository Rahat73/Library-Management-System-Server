import prisma from "../../utils/prisma";
import { IBorrowRecord } from "./borrow-record.interface";

const createBorrowRecordIntoDB = async (payload: IBorrowRecord) => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId: payload.bookId,
    },
  });

  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: payload.memberId,
    },
  });

  const result = await prisma.borrowRecord.create({
    data: payload,
  });

  return result;
};

const returnBookDB = async (borrowId: string) => {
  await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId,
    },
  });

  const result = await prisma.borrowRecord.update({
    where: {
      borrowId,
    },
    data: {
      returnDate: new Date(),
    },
  });

  return result;
};

export const BorrowRecordServices = {
  createBorrowRecordIntoDB,
  returnBookDB,
};
