import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";
import { Role } from "@prisma/client";

interface Reward {
  id: number;
  name: string;
  icon: string;
  description: string;
  points: number;
  role: Role;
}

interface IInitial {
  data: Reward[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchReward = createAsyncThunk<Reward[]>(
  "reward/fetchReward",
  async () => {
    const response = await Api.rewards.getListRewards();
    return response;
  }
);

const initialState: IInitial = {
  data: [],
  status: "idle",
  error: null,
};

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReward.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReward.fulfilled,
        (state, action: PayloadAction<Reward[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchReward.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export default rewardSlice.reducer;
