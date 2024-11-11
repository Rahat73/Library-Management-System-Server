import prisma from "../../utils/prisma";
import { IBook } from "./book.interface";

const createBookIntoDB = async (payload: IBook) => {
  const result = await prisma.book.create({
    data: payload,
  });

  return result;
};

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();

  return result;
};

const gerBookByIdFromDB = async (bookId: string) => {
  const result = await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  });

  return result;
};

const updateBookIntoDB = async (bookId: string, payload: IBook) => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  });

  const result = await prisma.book.update({
    where: {
      bookId,
    },
    data: payload,
  });

  return result;
};

const deleteBookFromDB = async (bookId: string) => {
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId,
    },
  });

  const result = await prisma.book.delete({
    where: {
      bookId,
    },
  });

  return result;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  gerBookByIdFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};
