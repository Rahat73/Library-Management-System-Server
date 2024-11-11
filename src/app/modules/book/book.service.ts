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

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
};
