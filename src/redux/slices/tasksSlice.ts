import { Difficulty } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface TaskFormState {
  taskName: string;
  taskDifficulty: Difficulty | string;
}

interface Task {
  id: string;
  name: string;
  difficulty: Difficulty;
  points: number;
  completed: boolean;
}

interface TasksState {
  form: TaskFormState;
  tasks: Task[];
}

const difficultyPointsRange: Record<Difficulty, [number, number]> = {
  "Easy layout": [420, 515],
  "Medium layout": [616, 760],
  "Hard layout": [780, 922],
  "Easy App": [1140, 1460],
  "Medium App": [1550, 1890],
  "Hard App": [2100, 2830],
  "Learning info": [430, 620],
};

const getRandomPoints = (range: [number, number]): number => {
  const [min, max] = range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

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
    setTaskDifficulty: (state, action: PayloadAction<Difficulty | "">) => {
      state.form.taskDifficulty = action.payload;
    },
    addTask(state, action: PayloadAction<TaskFormState>) {
      const { taskName, taskDifficulty } = action.payload;

      if (!taskDifficulty) {
        return;
      }

      if (taskDifficulty in difficultyPointsRange) {
        const pointsRange = difficultyPointsRange[taskDifficulty as Difficulty];
        const points = getRandomPoints(pointsRange);

        const newTask: Task = {
          id: uuidv4(),
          name: taskName,
          difficulty: taskDifficulty as Difficulty,
          points,
          completed: false,
        };

        state.tasks.push(newTask);
        state.form.taskName = "";
        state.form.taskDifficulty = "";
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    completedTask(state, action: PayloadAction<string>) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = true;
      }
    },
  },
});

export const {
  setTaskName,
  setTaskDifficulty,
  addTask,
  deleteTask,
  completedTask,
} = tasksSlice.actions;
export default tasksSlice.reducer;
