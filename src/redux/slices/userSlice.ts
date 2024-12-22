import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";
import { User } from "@prisma/client";

interface IInitial {
  user: User | null;
  statusUser: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId: string) => {
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

const initialState: IInitial = {
  user: null,
  statusUser: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.statusUser = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.statusUser = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.statusUser = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export default userSlice.reducer;
