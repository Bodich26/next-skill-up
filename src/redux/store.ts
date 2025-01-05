import { configureStore } from "@reduxjs/toolkit";

import tasksReducer from "./slices/tasksSlice";
import userReducer from "./slices/userSlice";
import rewardReducer from "./slices/rewardSlice";
import quizReducer from "./slices/quizSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
    reward: rewardReducer,
    quiz: quizReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
