import { z } from "zod";

export const ResetSchema = z.object({
  email: z.string().email({
    message: "A valid email address is required.",
  }),
});
