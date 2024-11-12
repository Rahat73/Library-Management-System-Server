import httpStatus from "http-status";
import AppError from "../../errors/app-error";
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
    throw new AppError(httpStatus.CONFLICT, "Book is out of stock");
  }

  await prisma.member.findUniqueOrThrow({
    where: {
      memberId: payload.memberId,
    },
  });

  // reducing availableCopies when borrowing
  // performing atomic transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.book.update({
      where: {
        bookId: payload.bookId,
      },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    });

    const record = await transactionClient.borrowRecord.create({
      data: payload,
    });

    return record;
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
    throw new AppError(httpStatus.CONFLICT, "Book already returned");
  }

  // increasing availableCopies when returning
  // performing atomic transaction
  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.book.update({
      where: {
        bookId: record.bookId,
      },
      data: {
        availableCopies: {
          increment: 1,
        },
      },
    });

    const updatedRecord = await transactionClient.borrowRecord.update({
      where: {
        borrowId,
      },
      data: {
        returnDate: new Date(),
      },
    });

    return updatedRecord;
  });

  return result;
};

const getAllOverdueBorrowsFromDB = async () => {
  const result = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lte: new Date(new Date().getTime() - dueTime), //checking overdue 14 days
      },
    },
    select: {
      borrowId: true,
      borrowDate: true,
      book: {
        select: {
          title: true,
        },
      },
      member: {
        select: {
          name: true,
        },
      },
    },
  });

  const overdueList = result.map((record) => {
    // calculating overdue days
    const overdueDays =
      Math.floor(
        (new Date().getTime() - record.borrowDate.getTime()) /
          (1000 * 60 * 60 * 24)
      ) - 14;

    return {
      borrowId: record.borrowId,
      bookTitle: record.book.title,
      borrowerName: record.member.name,
      overdueDays,
    };
  });

  return overdueList;
};

export const BorrowRecordServices = {
  createBorrowRecordIntoDB,
  returnBookDB,
  getAllOverdueBorrowsFromDB,
};
