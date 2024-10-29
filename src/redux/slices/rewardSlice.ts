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
  statusRewards: "idle" | "loading" | "succeeded" | "failed";
  statusAddRewards: "idle" | "loading" | "succeeded" | "failed";
  statusRemoveRewards: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchRewards = createAsyncThunk<Reward[]>(
  "reward/fetchRewards",
  async () => {
    const response = await Api.rewards.getListRewards();
    return response;
  }
);

export const addRewardToUser = createAsyncThunk(
  "reward/addRewardToUser",
  async ({ userId, rewardId }: { userId: number; rewardId: number }) => {
    try {
      const response = await Api.rewards.postRewardToUser(userId, rewardId);
      console.log("Reward from server:", response);
      return response;
    } catch (error) {
      console.log("Error fetching Rewards:", error);
      throw error;
    }
  }
);

export const removeRewardToUser = createAsyncThunk(
  "reward/removeRewardToUser",
  async ({ userId, rewardId }: { userId: number; rewardId: number }) => {
    try {
      const response = await Api.rewards.deleteRewardToUser(userId, rewardId);
      console.log("Reward from server:", response);
      return response;
    } catch (error) {
      console.log("Error fetching Rewards:", error);
      throw error;
    }
  }
);

const initialState: IInitial = {
  data: [],
  statusRewards: "idle",
  statusAddRewards: "idle",
  statusRemoveRewards: "idle",
  error: null,
};

const rewardSlice = createSlice({
  name: "reward",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.statusRewards = "loading";
      })
      .addCase(
        fetchRewards.fulfilled,
        (state, action: PayloadAction<Reward[]>) => {
          state.statusRewards = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchRewards.rejected, (state, action) => {
        state.statusRewards = "failed";
        state.error = action.error.message || "Error";
      })

      .addCase(addRewardToUser.pending, (state) => {
        state.statusAddRewards = "loading";
      })
      .addCase(
        addRewardToUser.fulfilled,
        (state, action: PayloadAction<Reward[]>) => {
          state.statusAddRewards = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(addRewardToUser.rejected, (state, action) => {
        state.statusAddRewards = "failed";
        state.error = action.error.message || "Error";
      })

      .addCase(removeRewardToUser.pending, (state) => {
        state.statusRemoveRewards = "loading";
      })
      .addCase(
        removeRewardToUser.fulfilled,
        (state, action: PayloadAction<Reward[]>) => {
          (state.statusRemoveRewards = "succeeded"),
            (state.data = action.payload);
        }
      )
      .addCase(removeRewardToUser.rejected, (state, action) => {
        state.statusRemoveRewards = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export default rewardSlice.reducer;
