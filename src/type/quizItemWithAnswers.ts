import { QuizAnswer, QuizItem } from "@prisma/client";

export interface QuizItemWithAnswers extends QuizItem {
  optional: QuizAnswer[];
}
