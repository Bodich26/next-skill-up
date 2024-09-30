export type UserType = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  rating: number;
  studyTimes: number;
  taskCompleted: number;
  iconRating: string;
};

export type TaskType = {
  id: string;
  name: string;
  points: number;
  type: string;
  difficulty:
    | "Easy layout"
    | "Medium layout"
    | "Hard layout"
    | "Easy app"
    | "Medium app"
    | "Hard app"
    | "Learning info";
};
