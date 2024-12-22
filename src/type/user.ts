import { Reward, Role } from "@prisma/client";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  rating: number;
  studyTimes: number;
  taskCompleted: number;
  iconRating: string;
  awards?: UserAwardType[];
};

export interface UserAwardType {
  id: number;
  userId: number;
  rewardId: number;
  reward: Reward[];
}

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
