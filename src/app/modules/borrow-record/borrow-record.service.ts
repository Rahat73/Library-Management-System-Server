import prisma from "../../utils/prisma";
import { dueTime } from "./borrow-record.constant";
import { IBorrowRecord } from "./borrow-record.interface";

const createBorrowRecordIntoDB = async (payload: IBorrowRecord) => {
  const book = await prisma.book.findUniqueOrThrow({
    where: {
      bookId: payload.bookId,
    },
  });

  if (book.availableCopies < 1) {
    throw new Error("Book is out of stock");
  }

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
  const record = await prisma.borrowRecord.findUniqueOrThrow({
    where: {
      borrowId,
    },
  });

  if (record.returnDate) {
    throw new Error("Book already returned");
  }

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

const getAllOverdueBorrowsFromDB = async () => {
  const result = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lte: new Date(new Date().getTime() - dueTime),
      },
    },
  });

  return result;
};

export const BorrowRecordServices = {
  createBorrowRecordIntoDB,
  returnBookDB,
  getAllOverdueBorrowsFromDB,
};
