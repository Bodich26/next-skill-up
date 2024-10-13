import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";
import { User } from "@/type/user";

interface IInitial {
  data: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: number) => {
    try {
      const response = await Api.users.user(userId);
      console.log("User from server:", response);
      return response;
    } catch (error) {
      console.log("Error fetching users:", error);
      throw error;
    }
  }
);

export const assignRewardToUser = createAsyncThunk(
  "reward/addRewardToUser",
  async ({ userId, rewardId }: { userId: number; rewardId: number }) => {
    const response = await Api.rewards.addRewardToUser(userId, rewardId);
    return response.user;
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
        state.data = {
          ...action.payload,
          awards: action.payload.awards || [],
        };
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error";
      })

      .addCase(assignRewardToUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        assignRewardToUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.status = "succeeded";
          state!.data!.awards = action.payload.awards;
        }
      )
      .addCase(assignRewardToUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export default userSlice.reducer;
