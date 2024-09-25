import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TaskFormState {
  taskName: string;
  taskDifficulty: string;
}

interface Task {
  id: number;
  name: string;
  difficulty: string;
}

interface TasksState {
  form: TaskFormState;
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
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
    setTaskDifficulty: (state, action: PayloadAction<string>) => {
      state.form.taskDifficulty = action.payload;
    },
    addTask(state) {
      const newTask: Task = {
        id: state.tasks.length + 1,
        name: state.form.taskName,
        difficulty: state.form.taskDifficulty,
      };
      state.tasks.push(newTask);
      state.form.taskName = "";
      state.form.taskDifficulty = "";
    },
  },
});

export const { setTaskName, setTaskDifficulty, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
