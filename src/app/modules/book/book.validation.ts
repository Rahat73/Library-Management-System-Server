import { z } from "zod";

const createBookValidation = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publishedYear: z.number({
      required_error: "Published year is required",
    }),
    totalCopies: z.number({
      required_error: "Total copies is required",
    }),
    availableCopies: z.number({
      required_error: "Available copies is required",
    }),
  }),
});

export const BookValidations = {
  createBookValidation,
};
