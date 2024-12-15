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
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw new Error(error.message || "An unexpected error occurred.");
  }
};

export const loginUser = async ({
  email,
  password,
  code,
}: {
  email: string;
  password: string;
  code?: string;
}) => {
  try {
    const { data } = await axiosInstance.post(`/auth/login`, {
      email,
      password,
      code,
    });
    return data;
  } catch (error: any) {
    throw error.data || error;
  }
};

export const resetPassword = async (values: string, token: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/new-password", {
      values,
      token,
    });
    return data;
  } catch (error: any) {
    throw error.data || error;
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/reset", {
      email,
    });
    return data;
  } catch (error: any) {
    throw error.data || error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/new-verification", {
      token,
    });
    return data;
  } catch (error: any) {
    throw error.data || error;
  }
};
