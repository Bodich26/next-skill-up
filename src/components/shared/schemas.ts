import { z } from "zod";

export const quizSchema = z.object({
  selectedAnswer: z.string().min(1, {
    message: "Необходимо выбрать ответ",
  }),
});
