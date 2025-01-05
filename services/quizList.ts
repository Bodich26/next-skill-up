import { axiosInstance } from "./instance";
import { QuizItemWithAnswers } from "@/type";

export const getQuizList = async () => {
  try {
    const { data } = await axiosInstance.get<QuizItemWithAnswers[]>("/quiz");
    return data;
  } catch (error: any) {
    console.error(
      "Ошибка получение Квизов - Services",
      error.response.data || error.message
    );
    throw new Error(
      error.response.data?.message || "Failed to fetch quizItems"
    );
  }
};
