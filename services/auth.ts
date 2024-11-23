import { User } from "@prisma/client";
import { axiosInstance } from "./instance";

type RegisterUserInput = {
  role: "FRONT_END" | "BACK_END" | "UI_UX_DESIGN" | "CG_ARTIST";
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export const registerUser = async ({
  name,
  email,
  password,
  passwordConfirm,
  role,
}: RegisterUserInput) => {
  try {
    const { data } = await axiosInstance.post(`/auth/register`, {
      name,
      email,
      password,
      passwordConfirm,
      role,
    });
    return data;
  } catch (error: any) {
    throw error.data || error;
  }
};

export const loginUser = async ({ email, password }: User) => {
  try {
    const { data } = await axiosInstance.post(`/auth/login`, {
      email,
      password,
    });
    return data;
  } catch (error: any) {
    throw error.data || error;
  }
};
