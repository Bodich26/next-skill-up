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
  sortOrder: "easyToHard" | "hardToEasy";
  error: string | null;
  form: TaskFormState;
}

interface IDifficulty {
  [key: string]: number;
}

const difficultyOrder: IDifficulty = {
  "easy layout": 1,
  "easy app": 1,
  "learning info": 1,
  "medium layout": 2,
  "medium app": 2,
  "hard layout": 3,
  "hard app": 3,
};

const sortTasks = (tasks: Task[], sortOrder: "easyToHard" | "hardToEasy") => {
  return [...tasks].sort((a, b) => {
    const difficultyA =
      difficultyOrder[a.difficulty.toLowerCase()] || difficultyOrder.medium;
    const difficultyB =
      difficultyOrder[b.difficulty.toLowerCase()] || difficultyOrder.medium;

    return sortOrder === "easyToHard"
      ? difficultyA - difficultyB
      : difficultyB - difficultyA;
  });
};

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
  sortOrder: "easyToHard",
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
      state.data = sortTasks(state.data, state.sortOrder);
    },
    completedTask(state, action: PayloadAction<string>) {
      const task = state.data.find((task) => task.idTask === action.payload);
      if (task) {
        task.completed = true;
      }
      state.data = sortTasks(state.data, state.sortOrder);
    },
    filterTask(state, action: PayloadAction<"easyToHard" | "hardToEasy">) {
      state.sortOrder = action.payload;
      state.data = sortTasks(state.data, state.sortOrder);
    },
  },
  extraReducers: (builder) => {
    builder
      //---Add New Task
      .addCase(
        addNewTaskToUser.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.data.unshift(action.payload);
          state.data = sortTasks(state.data, state.sortOrder);
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
          state.data = sortTasks(state.data, state.sortOrder);
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
          state.data = sortTasks(state.data, state.sortOrder);
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
          state.data = sortTasks(state.data, state.sortOrder);
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
          state.data = sortTasks(state.data, state.sortOrder);
        }
      )
      .addCase(setTimeValueCompleteTask.rejected, (state, action) => {
        (state.statusTimeValueCompleteTask = "failed"),
          (state.error = action.error.message || "Error");
      });
  },
});

export const {
  setTaskName,
  setTaskDifficulty,
  deleteTask,
  completedTask,
  filterTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
