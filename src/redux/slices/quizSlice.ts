import { QuizItem } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";
import { QuizItemWithAnswers } from "@/type";

interface IInitial {
  quiz: QuizItemWithAnswers[];
  statusQuiz: "idle" | "loading" | "succeeded" | "failed";
  errorQuiz: string | null;
}

export const fetchQuizItems = createAsyncThunk(
  "quiz/fetchQuizItems",
  async () => {
    try {
      const response = await Api.quizList.getQuizList();
      console.log("Полученные квизы:", response);
      return response;
    } catch (error) {
      console.error("Ошибка при получении Квизов - Redux Slice:", error);
      throw error;
    }
  }
);

const initialState: IInitial = {
  quiz: [],
  statusQuiz: "idle",
  errorQuiz: null,
};

const quizItemsSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizItems.pending, (state) => {
        state.statusQuiz = "loading";
      })
      .addCase(
        fetchQuizItems.fulfilled,
        (state, action: PayloadAction<QuizItemWithAnswers[]>) => {
          (state.statusQuiz = "succeeded"), (state.quiz = action.payload);
        }
      )
      .addCase(fetchQuizItems.rejected, (state, action) => {
        state.statusQuiz = "failed";
        state.errorQuiz = action.error.message || "Error";
      });
  },
});

export default quizItemsSlice.reducer;
