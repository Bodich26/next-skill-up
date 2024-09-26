export type UserType = {
  id: number;
  name: string;
  role: string;
  rating: number;
  studyTimes: number;
  taskCompleted: number;
  iconRating: string;
  awards: {
    [key: string]: {
      icon: string;
      point: number;
    };
  };
  tasks: TaskType[];
};

export type TaskType = {
  id: number;
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
    | "Landing page Design"
    | "Easy app Design"
    | "Medium app Design"
    | "Hard app Design"
    | "Learning info";
};
