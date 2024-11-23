import { z } from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: "A valid email address is required.",
    }),
    name: z.string().min(3, {
      message: "Name must be at least 3 characters long.",
    }),
    role: z.enum(["FRONT_END", "BACK_END", "UI_UX_DESIGN", "CG_ARTIST"], {
      message: "Account type is required.",
    }),
    password: z.string().min(3, {
      message: "Password must be at least 3 characters long.",
    }),
    passwordConfirm: z.string().min(3, {
      message: "Password confirm must be at least 3 characters long.",
    }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Password do not match",
    path: ["passwordConfirm"],
  });