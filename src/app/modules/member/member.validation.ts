import { z } from "zod";

const createMemberValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
    phone: z.string({
      required_error: "Phone is required",
    }),
    membershipDate: z
      .string({
        required_error: "Membership date is required",
      })
      .datetime(),
  }),
});

const updateMemberValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    membershipDate: z.string().datetime().optional(),
  }),
});

export const MemberValidation = {
  createMemberValidation,
  updateMemberValidation,
};
