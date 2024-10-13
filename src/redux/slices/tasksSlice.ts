import { Difficulty } from "@/type";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../../../services/api-client";
import { Task } from "@prisma/client";

interface TaskFormState {
  taskName: string;
  taskDifficulty: Difficulty | string;
}

interface TasksState {
  data: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  form: TaskFormState;
}

export const fetchTasksList = createAsyncThunk(
  "tasks/fetchTasksList",
  async () => {
    console.log("Fetching tasks...");
    try {
      const response = await Api.tasksList.getTasksList();
      console.log("Tasks from server:", response);
      return response;
    } catch (error) {
      console.log("Error fetching tasks:", error);
      throw error;
    }
  }
);

export const addNewTaskToUser = createAsyncThunk(
  "tasks/addNewTaskToUser",
  async (
    {
      userId,
      name,
      difficulty,
      completed,
    }: {
      userId: number;
      name: string;
      difficulty: Difficulty;
      completed: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await Api.tasksList.postNewTaskToUser(
        userId,
        name,
        difficulty,
        completed
      );
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TasksState = {
  data: [],
  status: "idle",
  error: null,
  form: {
    taskName: "",
    taskDifficulty: "",
  },
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTaskName: (state, action: PayloadAction<string>) => {
      state.form.taskName = action.payload;
    },
    setTaskDifficulty: (state, action: PayloadAction<Difficulty | "">) => {
      state.form.taskDifficulty = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.data = state.data.filter((task) => task.idTask !== action.payload);
    },
    completedTask(state, action: PayloadAction<string>) {
      const task = state.data.find((task) => task.idTask === action.payload);
      if (task) {
        task.completed = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        addNewTaskToUser.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.data.push(action.payload);
        }
      )
      .addCase(fetchTasksList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchTasksList.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchTasksList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Error";
      });
  },
});

export const { setTaskName, setTaskDifficulty, deleteTask, completedTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
