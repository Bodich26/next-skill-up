import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice";
import userReducer from "./slices/userSlice";
import rewardReducer from "./slices/rewardSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
    reward: rewardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
