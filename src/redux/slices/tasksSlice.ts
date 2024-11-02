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
  statusTasksList: "idle" | "loading" | "succeeded" | "failed";
  statusRemoveUserTask: "idle" | "loading" | "succeeded" | "failed";
  statusCompletedUserTask: "idle" | "loading" | "succeeded" | "failed";
  statusTimeValueCompleteTask: "idle" | "loading" | "succeeded" | "failed";
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

export const removeUserTask = createAsyncThunk(
  "tasks/removeUserTask",
  async ({ idTask }: { idTask: string }) => {
    try {
      const response = await Api.tasksList.deleteTaskToUser(idTask);
      console.log("Task from server:", response);
      return response;
    } catch (error) {
      console.log("Error when removing a Task:", error);
      throw error;
    }
  }
);

export const completedUserTask = createAsyncThunk(
  "tasks/completedUserTask",
  async ({ idTask, completed }: { idTask: string; completed: boolean }) => {
    try {
      const response = await Api.tasksList.completeTaskToUser(
        idTask,
        completed
      );
      console.log("Task from server:", response);
      return response;
    } catch (error) {
      console.log("Error while executing Task:", error);
      throw error;
    }
  }
);

export const setTimeValueCompleteTask = createAsyncThunk(
  "tasks/setTimeValueCompleteTask",
  async ({ time, userId }: { time: number; userId: number }) => {
    try {
      const response = await Api.tasksList.setStudyTimeToUser(time, userId);
      console.log("Task from server:", response);
      return response;
    } catch (error) {
      console.log("Error set study time to User:", error);
      throw error;
    }
  }
);

const initialState: TasksState = {
  data: [],
  statusTasksList: "idle",
  statusRemoveUserTask: "idle",
  statusCompletedUserTask: "idle",
  statusTimeValueCompleteTask: "idle",
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
      //---Add New Task
      .addCase(
        addNewTaskToUser.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.data.unshift(action.payload);
        }
      )
      .addCase(fetchTasksList.pending, (state) => {
        state.statusTasksList = "loading";
      })
      .addCase(
        fetchTasksList.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.statusTasksList = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchTasksList.rejected, (state, action) => {
        state.statusTasksList = "failed";
        state.error = action.error.message || "Error";
      })

      //---Remove Task User
      .addCase(removeUserTask.pending, (state) => {
        state.statusRemoveUserTask = "loading";
      })
      .addCase(
        removeUserTask.fulfilled,
        (state, action: PayloadAction<Task>) => {
          (state.statusRemoveUserTask = "succeeded"),
            (state.data = state.data.filter(
              (task) => task.idTask !== action.payload.idTask
            ));
        }
      )
      .addCase(removeUserTask.rejected, (state, action) => {
        state.statusRemoveUserTask = "failed";
        state.error = action.error.message || "Error";
      })

      //---Complete Task User
      .addCase(completedUserTask.pending, (state) => {
        state.statusCompletedUserTask = "loading";
      })
      .addCase(
        completedUserTask.fulfilled,
        (state, action: PayloadAction<Task>) => {
          (state.statusCompletedUserTask = "succeeded"),
            (state.data = state.data.filter(
              (task) => task.completed !== action.payload.completed
            ));
        }
      )
      .addCase(completedUserTask.rejected, (state, action) => {
        state.statusCompletedUserTask = "failed";
        state.error = action.error.message || "Error";
      })

      //---Set study time Task for user
      .addCase(setTimeValueCompleteTask.pending, (state) => {
        state.statusTimeValueCompleteTask = "loading";
      })
      .addCase(
        setTimeValueCompleteTask.fulfilled,
        (state, action: PayloadAction<any>) => {
          (state.statusTimeValueCompleteTask = "succeeded"),
            (state.data = action.payload);
        }
      )
      .addCase(setTimeValueCompleteTask.rejected, (state, action) => {
        (state.statusTimeValueCompleteTask = "failed"),
          (state.error = action.error.message || "Error");
      });
  },
});

export const { setTaskName, setTaskDifficulty, deleteTask, completedTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
