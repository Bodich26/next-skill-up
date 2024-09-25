import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: {},
};

export const tasksSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
});

export const {} = tasksSlice.actions;
export default tasksSlice.reducer;
