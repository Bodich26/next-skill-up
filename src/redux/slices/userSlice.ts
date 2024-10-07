import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  rating: number;
  studyTimes: number;
  taskCompleted: number;
  iconRating: string;
}

interface IInitial {
  data: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: number) => {
    const response = await Api.users.user(userId);
    return response;
  }
);

export const assignRewardToUser = createAsyncThunk(
  "reward/addRewardToUser",
  async ({ userId, rewardId }: { userId: number; rewardId: number }) => {
    const response = await Api.rewards.addRewardToUser(userId, rewardId);
    return response;
  }
);

const initialState: IInitial = {
  data: null,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export default userSlice.reducer;
