import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";
import { User } from "@/type/user";

interface IInitial {
  data: User | null;
  statusUser: "idle" | "loading" | "succeeded" | "failed";
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

const initialState: IInitial = {
  data: null,
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
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.statusUser = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export default userSlice.reducer;
