import { boolean, z } from "zod";
import { axiosInstance } from "./instance";
import { LoginSchema, ResetSchema } from "@/components/auth";
import {
  NewPasswordSchema,
  RegisterSchema,
  VerifyEmailSchema,
} from "@/components/auth/schemas";

type LoginData = z.infer<typeof LoginSchema>;
type ResetPasswordData = z.infer<typeof ResetSchema>;
type NewPasswordData = z.infer<typeof NewPasswordSchema>;
type VerifyEmailData = z.infer<typeof VerifyEmailSchema>;
type RegisterUserData = z.infer<typeof RegisterSchema>;

type ResponseServerMessage = { success: string | boolean } | { error: string };
type ResponseServerLoginUser =
  | {
      success: boolean | string;
      verificationToken: string;
      twoFactor: boolean;
      message: string;
    }
  | { error: string };

type ResponseServerRegisterUser =
  | { success: string | boolean; user: object }
  | { error: string };

export const registerUser = async (
  input: RegisterUserData
): Promise<ResponseServerRegisterUser> => {
  try {
    const validateInput = RegisterSchema.parse(input);

    const { data } = await axiosInstance.post<ResponseServerRegisterUser>(
      `/auth/register`,
      validateInput
    );
    return data;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Ошибка валидации данных!", error.errors);
      throw new Error("Ошибка с данными для регистрации");
    }
    throw error.data || error;
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

export const resetPassword = async (
  input: NewPasswordData
): Promise<ResponseServerMessage> => {
  try {
    const validatedInput = NewPasswordSchema.parse(input);

    const { data } = await axiosInstance.post<ResponseServerMessage>(
      "/auth/new-password",
      {
        values: { password: validatedInput.password },
        token: validatedInput.token,
      }
    );

    return data;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log("Ошибка валидации", error.errors);
      throw new Error("Неверный ввод");
    }
    throw error.data || error;
  }
};

export const sendPasswordResetEmail = async (
  input: ResetPasswordData
): Promise<ResponseServerMessage> => {
  try {
    const validatedInput = ResetSchema.parse(input);

    const { data } = await axiosInstance.post<ResponseServerMessage>(
      "/auth/reset",
      validatedInput
    );

    return data;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log("Ошибка валидации", error.errors);
      throw new Error("Неверный ввод");
    }
    throw error.data || error;
  }
};

export const verifyEmail = async (
  input: VerifyEmailData
): Promise<ResponseServerMessage> => {
  try {
    const validatedInput = VerifyEmailSchema.parse(input);

    const { data } = await axiosInstance.post<ResponseServerMessage>(
      "/auth/new-verification",
      {
        token: validatedInput.token,
      }
    );
    return data;
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.log("Ошибка валидации", error.errors);
      throw new Error("Неверный Токен");
    }
    throw error.data || error;
  }
};

export const logoutUser = async () => {
  try {
    const user = await axiosInstance.post(`/auth/signout`);
    return user;
  } catch (error: any) {
    throw error.response?.data || error;
  }
};
