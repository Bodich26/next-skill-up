import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "A valid email address is required.",
  }),
  password: z.string().min(3, {
    message: "Password must be at least 3 characters long.",
  }),
});
