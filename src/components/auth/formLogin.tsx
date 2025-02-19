"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button, Input } from "@/components/ui";
import { Container } from "@/components/shared";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormError } from "./formError";
import { FormSuccess } from "./formSuccess";
import { LoginSchema } from "./schemas";
import Link from "next/link";
import { loginUser } from "../../../services/auth";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

interface IProps {
  switchForm: () => void;
}

export const FormLogin: React.FC<IProps> = ({ switchForm }) => {
  const [showTwoFactor, setShowTwoFactor] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>("");
  const [success, setSuccess] = React.useState<string | undefined>("");
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();

  const login = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitLogin = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await loginUser({
          email: values.email,
          password: values.password,
          code: showTwoFactor ? values.code : undefined,
        });

        if (response.twoFactor) {
          setShowTwoFactor(true);
        } else if (response.success) {
          setSuccess(response.message);
          login.reset();
        } else if (response.error) {
          setError(response.error);
        } else {
          setSuccess("Успешный Вход!");
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      } catch (err: any) {
        console.error("Ошибка при входе в аккаунт!", err);
        setError(err?.message || "Неизвестная ошибка!");
      }
    });
  };

  return (
    <section key="login-form" className="flex items-center justify-center">
      <Container>
        <div className="pt-40 pb-10">
          <Form {...login}>
            <form
              className=" flex flex-col gap-4 p-4 border-[1px] border-solid border-input bg-card rounded-lg"
              onSubmit={login.handleSubmit(handleSubmitLogin)}
            >
              <div className="max-w-80 flex flex-col gap-3">
                <h1 className=" text-3xl font-bold">Вход в аккаунт</h1>
                <p className="opacity-50 ">Введите вашу почту и пароль</p>
              </div>
              <div>
                <p
                  className="opacity-50 cursor-pointer text-center hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  onClick={switchForm}
                >
                  Создать аккаунт
                </p>
              </div>
              {showTwoFactor && (
                <FormField
                  name="code"
                  control={login.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Двухфакторный код
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="w-80 h-10"
                            placeholder="123456"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
              {!showTwoFactor && (
                <>
                  <FormField
                    name="email"
                    control={login.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Почта
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 h-10"
                              placeholder="m@example.com"
                              type="email"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name="password"
                    control={login.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="text-lg font-semibold">
                            Пароль
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="w-80 h-10"
                              placeholder="***"
                              type="password"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <Button
                            className="font-normal"
                            variant="link"
                            size="sm"
                            type="submit"
                            disabled={isPending}
                          >
                            <Link href="/auth/reset">Забыли пароль?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </>
              )}
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} className=" mt-[10px]" type="submit">
                {showTwoFactor ? "Подтвердить" : "Вход"}
              </Button>
            </form>
          </Form>
        </div>
      </Container>
    </section>
  );
};
