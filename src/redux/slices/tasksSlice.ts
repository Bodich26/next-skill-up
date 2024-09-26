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
}

interface TasksState {
  form: TaskFormState;
  tasks: Task[];
}

const difficultyPointsRange: Record<Difficulty, [number, number]> = {
  "Easy layout": [1, 3],
  "Medium layout": [2, 5],
  "Hard layout": [3, 7],
  "Easy App": [1, 3],
  "Medium App": [2, 5],
  "Hard App": [3, 7],
  "Landing page Design": [2, 4],
  "Easy app Design": [1, 3],
  "Medium app Design": [2, 5],
  "Hard app Design": [3, 7],
  "Learning info": [1, 2],
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
        };

        state.tasks.push(newTask);
        state.form.taskName = "";
        state.form.taskDifficulty = "";
      }
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTaskName, setTaskDifficulty, addTask, deleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
