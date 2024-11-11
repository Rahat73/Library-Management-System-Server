import prisma from "../../utils/prisma";

const getAllBooksFromDB = async () => {
  const result = await prisma.book.findMany();

  return result;
};

export const BookServices = {
  getAllBooksFromDB,
};
